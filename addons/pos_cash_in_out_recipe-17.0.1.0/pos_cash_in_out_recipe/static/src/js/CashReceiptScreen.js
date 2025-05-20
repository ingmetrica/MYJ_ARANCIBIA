/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { useRef, useState, onWillStart, Component } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { CashMoveReceipt } from "@point_of_sale/app/navbar/cash_move_popup/cash_move_receipt/cash_move_receipt";
export class CashReceiptScreen extends Component {
    static template = "pos_cash_in_out_recipe.CashReceiptScreen";
    static components = { CashMoveReceipt };

    setup() {
        super.setup(...arguments);
        this.pos = usePos();
        this.reason = this.props.reason
        this.translatedType = this.props.translatedType
        this.formattedAmount = this.props.formattedAmount
        this.headerData = this.props.headerData
        this.printer = useService("printer");
        
    }

    confirm() {
        this.pos.showScreen("ProductScreen");
    }
    tryprint(){
        var reason = this.reason
        var translatedType = this.translatedType
        var formattedAmount = this.formattedAmount
        this.printer.print(CashMoveReceipt, {
            reason,
            translatedType,
            formattedAmount,
            headerData: this.headerData,
            date: new Date().toLocaleString(),
        },{ webPrintFallback: true });
    }
    
  
}

registry.category("pos_screens").add("CashReceiptScreen", CashReceiptScreen);
