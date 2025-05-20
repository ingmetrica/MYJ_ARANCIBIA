  /** @odoo-module **/

  import { _t } from "@web/core/l10n/translation";
  import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
  import { useService } from "@web/core/utils/hooks";
  import { Component } from "@odoo/owl";
  import { usePos } from "@point_of_sale/app/store/pos_hook";
  export class CashInOutStatementButton extends Component {
        static template = "pos_cash_in_out_recipe.CashInOutStatementButton";
        setup() {
          this.pos = usePos();
          this.popup = useService("popup");
          this.orm = useService("orm");
          this.data = this.props.reason
        }
        async onClick() {
        
            const data = await this.orm.call("pos.session", "get_cash_register", [
                [this.pos.pos_session.id],this.pos.pos_session.id
            ]);
            this.data = data
            this.pos.showScreen("CashInOutStatementReceiptScreen", {
                headerData: this.pos.getReceiptHeaderData(),
                data: this.data,
            });
        }
   
  }

  ProductScreen.addControlButton({
      component: CashInOutStatementButton,
      condition: function () {
          return this.pos.config.cash_report
      },
  })
