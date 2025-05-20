/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { CashMovePopup } from "@point_of_sale/app/navbar/cash_move_popup/cash_move_popup";
import { _t } from "@web/core/l10n/translation";
import { CashMoveReceipt } from "@point_of_sale/app/navbar/cash_move_popup/cash_move_receipt/cash_move_receipt";
patch(CashMovePopup.prototype, {
    async confirm() {
        const amount = parseFloat(this.state.amount);
        const formattedAmount = this.env.utils.formatCurrency(amount);
        const reason_current = this.state.reason;
        if (!amount) {
            this.notification.add(_t("Cash in/out of %s is ignored.", formattedAmount), 3000);
            return this.props.close();
        }
 
        if (!reason_current){
        
            this.notification.add(_t("Please enter a reason."), 3000);
            return this.props.close();
        }
        
        const type = this.state.type;
        var operation = "";
        if (type == "out") {
            operation = "cash out";
        } else {
            operation = "Cash in";
        }
        const translatedType = _t(operation);
        const extras = { formattedAmount, translatedType };
        const reason = this.state.reason.trim();
        await this.orm.call("pos.session", "try_cash_in_out", [
            [this.pos.pos_session.id],
            type,
            amount,
            reason,
            extras,
        ]);
        await this.pos.logEmployeeMessage(
            `${_t("Cash")} ${translatedType} - ${_t("Amount")}: ${formattedAmount}`,
            "CASH_DRAWER_ACTION"
        );
        if (this.pos.config.cash_report) {
            
            this.pos.showScreen("CashReceiptScreen", {
                reason,
                translatedType,
                formattedAmount,
                headerData: this.pos.getReceiptHeaderData(),
                date: new Date().toLocaleString(),
            });

        }
        await this.printer.print(CashMoveReceipt, {
            reason,
            translatedType,
            formattedAmount,
            headerData: this.pos.getReceiptHeaderData(),
            date: new Date().toLocaleString(),
        });
        this.props.close();
        this.notification.add(
            _t("Successfully made a cash %s of %s.", type, formattedAmount),
            3000
        );
    }
});
