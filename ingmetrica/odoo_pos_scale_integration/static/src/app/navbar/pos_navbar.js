/** @odoo-module */

import { Navbar } from "@point_of_sale/app/navbar/navbar";
import { patch } from "@web/core/utils/patch";
import { WeightScreen } from "@odoo_pos_scale_integration/js/weight_screen"
console.log(WeightScreen,"WeightScreen")

Navbar.components = { ...Navbar.components, WeightScreen }