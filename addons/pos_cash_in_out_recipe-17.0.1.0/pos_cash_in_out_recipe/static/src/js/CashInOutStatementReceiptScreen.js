/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { useRef, useState, onWillStart, Component } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { CashInOutStatementReceipt } from "@pos_cash_in_out_recipe/js/CashInOutStatementReceipt";
export class CashInOutStatementReceiptScreen extends Component {
    static template = "pos_cash_in_out_recipe.CashInOutStatementReceiptScreen";
    static components = { CashInOutStatementReceipt };

    setup() {
        super.setup(...arguments);
        this.pos = usePos();
        this.headerData = this.props.headerData
        this.data = this.props.data
        this.printer = useService("printer");
        
    }

    confirm() {
        this.pos.showScreen("ProductScreen");
    }
    tryprint(){


        this.printer.print(CashInOutStatementReceipt, {
            headerData: this.headerData,
            data: this.data,
        },{ webPrintFallback: true });
    }
    
  
}

registry.category("pos_screens").add("CashInOutStatementReceiptScreen", CashInOutStatementReceiptScreen);
