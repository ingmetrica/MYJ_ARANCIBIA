# -*- coding: utf-8 -*-

from odoo import SUPERUSER_ID, api


def create_journal_sequences(env):
    env = api.Environment(env.cr, SUPERUSER_ID, {})
    journals = env["account.journal"].with_context(active_test=False).search([])
    for journal in journals:
        vals = {}
        journal_vals = {
            "code": journal.code,
            "name": journal.name,
            "company_id": journal.company_id.id,
        }
        seq_vals = journal._prepare_sequence(journal_vals)
        vals["sequence_id"] = env["ir.sequence"].create(seq_vals).id
        if journal.type in ("sale", "purchase") and journal.refund_sequence:
            rseq_vals = journal._prepare_sequence(journal_vals, refund=True)
            vals["refund_sequence_id"] = env["ir.sequence"].create(rseq_vals).id
        journal.write(vals)
    return
