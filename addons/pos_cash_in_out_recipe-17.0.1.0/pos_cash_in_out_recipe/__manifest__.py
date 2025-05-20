# -*- coding: utf-8 -*-
{
    'name': 'POS Cash In/Out Ticket',
    'version': '17.0.1.0',
    'summary': 'Generates tickets for cash in/out transactions at the POS',
    'description': """
        This module adds the functionality to print tickets for cash movements (in or out) directly from the POS interface.
        Perfect for businesses looking to keep a detailed record of all cash transactions at the point of sale.
        Supports Odoo 17, ensuring compatibility with the latest POS features and improvements.
    """,
    'category': 'Point of Sale',
    'author': 'KENDATEC',
    'website': 'https://kendatec.com',
    'license': 'AGPL-3',
    'price': 20.00,
    'currency': 'USD',
    'depends': ['point_of_sale'],
    'data': [
        'views/pos_config_view.xml',
        'views/pos_session_view.xml',
        'report/pos_cash_in_out_report_ticket.xml',
    ],
    'images': [
        'static/description/images/banner_cash.png'
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
     'assets': {
		'point_of_sale._assets_pos': [
			"pos_cash_in_out_recipe/static/src/js/CashMovePopup.js",
			"pos_cash_in_out_recipe/static/src/js/CashReceiptScreen.js",
			'pos_cash_in_out_recipe/static/src/xml/CashReceiptScreen.xml',
            'pos_cash_in_out_recipe/static/src/xml/CashMoveReceipt.xml',
            
            'pos_cash_in_out_recipe/static/src/js/CashInOutStatementButton.js',
            'pos_cash_in_out_recipe/static/src/js/CashInOutStatementReceipt.js',
            'pos_cash_in_out_recipe/static/src/js/CashInOutStatementReceiptScreen.js',
            'pos_cash_in_out_recipe/static/src/xml/CashInOutStatementButton.xml',
            'pos_cash_in_out_recipe/static/src/xml/CashInOutStatementReceipt.xml',
            'pos_cash_in_out_recipe/static/src/xml/CashInOutStatementReceiptScreen.xml',
            

		],
	},
}
