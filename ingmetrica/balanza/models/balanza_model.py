from odoo import models, fields, api
import logging

_logger = logging.getLogger(__name__)

class Balanza(models.Model):
    _name = 'balanza.model'
    _description = 'Modelo para almacenar pesos'

    peso = fields.Float(string='Peso', required=True)
    pos_id = fields.Many2one('pos.config', string="Punto de Venta", required=True, ondelete="cascade")

    @api.model
    def create(self, vals_list):
        res = super(Balanza, self).create(vals_list)
        if res.pos_id:
            message = {
                "value": {
                    'weight': res.peso,
                    'pos_id': res.pos_id.id,
                },
                "channel": f'POS_WEIGHT_{res.pos_id.id}',
            }
            _logger.info("Enviando mensaje al POS en create: %s", message)
            self.env["bus.bus"]._sendone(f'POS_WEIGHT_{res.pos_id.id}', "notification", message)
        return res

    def write(self, vals_list):
        res = super(Balanza, self).write(vals_list)
        if 'peso' in vals_list and self.pos_id:
            message = {
                "value": {
                    'weight': vals_list['peso'],
                    'pos_id': self.pos_id.id,
                },
                "channel": f'POS_WEIGHT_{self.pos_id.id}',
            }
            _logger.info("Enviando mensaje al POS en write: %s", message)
            self.env["bus.bus"]._sendone(f'POS_WEIGHT_{self.pos_id.id}', "notification", message)
        return res
