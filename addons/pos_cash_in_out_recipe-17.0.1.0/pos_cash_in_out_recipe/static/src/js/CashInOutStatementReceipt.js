/** @odoo-module **/

import { Component } from "@odoo/owl";
import { ReceiptHeader } from "@point_of_sale/app/screens/receipt_screen/receipt/receipt_header/receipt_header";

export class CashInOutStatementReceipt extends Component {
    static template = "pos_cash_in_out_recipe.CashInOutStatementReceipt";
    static components = { ReceiptHeader };
    // static props = {
    //     reason: String,
    //     translatedType: String,
    //     formattedAmount: String,
    //     headerData: Object,
    //     date: String,
    // };
    static props = {

        headerData: Object,
        data: Object,

    };
}
