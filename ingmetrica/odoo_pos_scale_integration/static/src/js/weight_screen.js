
/** @odoo-module **/
import { useEffect, useRef, useState, Component, onWillUnmount } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/store/pos_hook";

export class WeightScreen extends Component {
    static template = "WeightScreen";
 
    setup() {
        this.pos = usePos();

        this.state = useState({
            product_weight: '',
            hover: false,
        });

        this.root = useRef('root');
        this.position = useState({ left: null, top: null });

        this.pollPesoHTTP();
    }

    pollPesoHTTP() {
        const fetchPeso = async () => {
            try {
                const response = await fetch("http://localhost:9032");  // Ya no usamos no-cors
                const data = await response.json();

                const pesoStr = data.peso || "";
                const peso = parseFloat(pesoStr.replace(/[^\d.]/g, '')) / 1000;

                if (!isNaN(peso)) {
                    this.state.product_weight = peso;
                    this.product_weight = peso;
                    this.pos.get_order().product_weight = peso;
                    console.log("⚖️ Peso recibido por HTTP:", peso);
                }
            } catch (e) {
                console.warn("📡 Error al obtener peso por HTTP:", e.message);
            } finally {
                setTimeout(fetchPeso, 200); 
            }
        };

        fetchPeso();
    }

    AddWeight() {
        const selectedOrderline = this.pos.get_order().get_selected_orderline();
        if (selectedOrderline && selectedOrderline.product.to_weight) {
            selectedOrderline.set_quantity(this.state.product_weight);
        }
    }
}
