/** @odoo-module **/
import { useBus, useService } from "@web/core/utils/hooks";
import { useEffect, useRef, useState, Component } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/store/pos_hook";

export class WeightScreen extends Component {
    static template = "WeightScreen";
    setup() {
        this.pos = usePos();
        const posId = this.pos.config.id;
        this.channel = 'POS_WEIGHT_' + posId;
        this.state= useState({
            product_weight:'',
            hover: false,
        });
        this.root = useRef('root')
        this.busService = this.env.services.bus_service
        this.busService.addChannel(this.channel)
        this.busService.addEventListener("notification", this.onMessage.bind(this))
        this.position = useState({ left: null, top: null });
    }

    onMessage({detail: notifications}) {
           notifications = notifications.filter(item => item.payload.channel === this.channel)
           notifications.forEach(item => {
              this.state.product_weight = item.payload.value.weight
              this.product_weight = this.state.product_weight
              this.pos.get_order().product_weight = this.product_weight
           })
        }

        AddWeight() {
            const selectedOrderline = this.pos.get_order().get_selected_orderline();
            if (selectedOrderline && selectedOrderline.product.to_weight) {
                selectedOrderline.set_quantity(this.state.product_weight)
            }
        }
}

