{
    'name': 'Balanza',
    'version': '1.0',
    'category': 'Sales',
    'summary': 'Módulo para gestionar pesos',
    'description': """
    Módulo Balanza:
    ----------------
    Este módulo permite almacenar y gestionar pesos en un formato de lista.
    - Almacena el campo de peso como un dato de tipo flotante.
    - Muestra los registros en una vista de lista.
    - Accesible solo para administradores.
    """,
    'author': 'ING Metrica',
    'website': 'https://www.ingmetrica.cl',
    'license': 'LGPL-3',
    'depends': ['base','point_of_sale'],
    'data': [
        'security/balanza_security.xml',
        'security/ir.model.access.csv',
        'views/balanza_views.xml',
    ],
    'installable': True,
    'application': True,  
    'auto_install': False,  
}
