/** @odoo-module **/
import { useEffect, useRef, useState, Component, onWillUnmount } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/store/pos_hook";

export class WeightScreen extends Component {
    static template = "WeightScreen";

    setup() {
        this.pos = usePos();

        this.state = useState({
            product_weight: '', // Mostrará el peso tared (en kilogramos ahora)
            hover: false,
        });

        this.root = useRef('root');
        this.position = useState({ left: null, top: null });

        this.pesoTimer = null;

        this.pollPesoHTTP();

        onWillUnmount(() => {
            if (this.pesoTimer) {
                clearTimeout(this.pesoTimer);
            }
        });
    }

    pollPesoHTTP() {
        const fetchPeso = async () => {
            try {
                const response = await fetch("http://localhost:9032");
                const data = await response.json();

                const pesoStr = data.peso || "";
                const pesoGramos = parseFloat(pesoStr);

                if (!isNaN(pesoGramos)) {
                    const pesoKg = pesoGramos / 1000;
                    this.state.product_weight = pesoKg;
                    this.product_weight = pesoKg;
                    this.pos.get_order().product_weight = pesoKg;

                    console.log("⚖️ Peso recibido por HTTP (kg):", pesoKg);
                } else {
                    console.warn("📡 Peso no válido:", pesoStr);
                    this.state.product_weight = 'Error';
                }
            } catch (e) {
                console.warn("📡 Error al obtener peso:", e.message);
                this.state.product_weight = 'Offline';
            } finally {
                this.pesoTimer = setTimeout(fetchPeso, 200);
            }
        };

        fetchPeso();
    }

    AddWeight() {
        const selectedOrderline = this.pos.get_order().get_selected_orderline();
        if (selectedOrderline && selectedOrderline.product.to_weight) {
            selectedOrderline.set_quantity(this.state.product_weight); // Ya en kilogramos
        }
    }
}
