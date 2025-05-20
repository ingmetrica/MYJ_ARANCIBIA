# -*- coding: utf-8 -*-
from odoo import api, fields, models, _

class pos_config(models.Model):
    _inherit = "pos.config"

    cash_report = fields.Boolean(string='Cash Report')
    
class ResConfigSettings(models.TransientModel):
    _inherit = "res.config.settings"
    
    cash_report = fields.Boolean(
        related="pos_config_id.cash_report", readonly=False
    )   