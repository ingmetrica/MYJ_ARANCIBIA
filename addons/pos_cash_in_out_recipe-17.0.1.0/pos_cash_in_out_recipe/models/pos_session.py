from odoo import models, fields, api, _
from odoo.exceptions import UserError
class PosSession(models.Model):
    _inherit = 'pos.session'
    
    def print_report_cash_ticket(self):
        if  not self.statement_line_ids:
            raise UserError(_("There is no data."))
        return self.env.ref('pos_cash_in_out_recipe.pos_cash_in_out_report_ticket_action').report_action(self)
    
    def get_cash_register(self,session_id):
        session_id = self.env['pos.session'].search([('id','=',session_id)])
      
        data =[]
        total_debit = 0.0
        total_credit = 0.0
        if session_id and session_id.statement_line_ids:
            for line in session_id.statement_line_ids:
                total_debit = total_debit + line.amount if line.amount < 0 else total_debit
                total_credit = total_credit + line.amount if line.amount > 0 else total_credit
                values={
                    'date':line.date,
                    'reason':line.payment_ref,
                    'credit':line.amount if line.amount > 0 else '-',
                    'debit':abs(line.amount) if line.amount < 0 else '-',
                }
            
                data.append(values)
            return {'total_debit':abs(total_debit),'total_credit':total_credit,'data':data}
        else:
            return {'total_debit':abs(total_debit),'total_credit':total_credit,'data':data}
        
    