from pathlib import Path
from audit_schema import audit, TYPES

def test_audit_detects_present_types():
    html = '<script type="application/ld+json">{"@type":"FAQPage"}</script><script>{"@type":"WebApplication"}</script>'
    result = audit(html)
    assert result["FAQPage"] is True
    assert result["WebApplication"] is True
    assert result["SoftwareApplication"] is False
    assert result["BreadcrumbList"] is False
    assert result["HowTo"] is False

def test_audit_handles_whitespace_variations():
    html = '"@type"  :  "HowTo"'
    result = audit(html)
    assert result["HowTo"] is True

def test_audit_returns_all_types():
    result = audit("")
    assert set(result.keys()) == set(TYPES)
    assert all(v is False for v in result.values())
