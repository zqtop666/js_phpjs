function xmlwriter_end_attribute(xmlwriter) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_end_attribute(xmlwriter);
  // *     returns 1: true

  return xmlwriter.endAttribute();
}
function xmlwriter_end_cdata(xmlwriter) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_end_cdata(xmlwriter);
  // *     returns 1: true

  return xmlwriter.endCData();
}
function xmlwriter_end_comment(xmlwriter) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_end_comment(xmlwriter);
  // *     returns 1: true

  return xmlwriter.endComment();
}
function xmlwriter_end_document(xmlwriter) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_end_document(xmlwriter);
  // *     returns 1: true

  return xmlwriter.endDocument();
}
function xmlwriter_end_dtd() {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_end_dtd(xmlwriter);
  // *     returns 1: true

  return xmlwriter.endDTD();
}
function xmlwriter_end_dtd_attlist(xmlwriter) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_end_dtd_attlist(xmlwriter);
  // *     returns 1: true

  return xmlwriter.endDTDAttlist();
}
function xmlwriter_end_dtd_element(xmlwriter) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_end_dtd_element(xmlwriter);
  // *     returns 1: true

  return xmlwriter.endDTDElement();
}
function xmlwriter_end_dtd_entity(xmlwriter) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_end_dtd_entity(xmlwriter);
  // *     returns 1: true

  return xmlwriter.endDTDEntity();
}
function xmlwriter_end_element(xmlwriter) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_end_element(xmlwriter);
  // *     returns 1: true

  return xmlwriter.endElement();
}
function xmlwriter_end_pi(xmlwriter) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory(xmlwriter);
  // *     example 1: xmlwriter_end_pi(xmlwriter);
  // *     returns 1: true

  return xmlwriter.endPI();
}
function xmlwriter_flush(xmlwriter, empty) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_flush(false);
  // *     returns 1: "<root>Here's the buffer...</root>"

  return xmlwriter.flush(empty);
}
function xmlwriter_full_end_element(xmlwriter) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_full_end_element(xmlwriter);
  // *     returns 1: true

  return xmlwriter.fullEndElement();
}
function xmlwriter_output_memory(xmlwriter, flush) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_output_memory(xmlwriter, false);
  // *     returns 1: "<root>Here's the buffer...</root>"

  return xmlwriter.outputMemory(flush);
}
function xmlwriter_set_indent(xmlwriter, indent) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_set_indent(xmlwriter, true);
  // *     returns 1: true

  return xmlwriter.setIndent(indent);
}
function xmlwriter_set_indent_string(xmlwriter, indentString) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_set_indent_string(xmlwriter, '    ');
  // *     returns 1: true

  return xmlwriter.setIndentString(indentString);
}
function xmlwriter_start_attribute(xmlwriter, name) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_start_attribute(xmlwriter, 'href');
  // *     returns 1: true

  return xmlwriter.startAttribute(name);
}
function xmlwriter_start_attribute_ns(xmlwriter, prefix, name, uri) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_start_attribute_ns(xmlwriter, 'xlink', 'href', 'http://www.w3.org/1999/xlink');
  // *     returns 1: true

  return xmlwriter.startAttributeNS(prefix, name, uri);
}
function xmlwriter_start_cdata(xmlwriter) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_start_cdata(xmlwriter);
  // *     returns 1: true

  return xmlwriter.startCData();
}
function xmlwriter_start_comment(xmlwriter) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_start_comment(xmlwriter);
  // *     returns 1: true

  return xmlwriter.startComment();
}
function xmlwriter_start_document(xmlwriter, version, encoding, standalone) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_start_document(xmlwriter, '1.0', null, null);
  // *     returns 1: true

  return xmlwriter.startDocument(version, encoding, standalone);
}
function xmlwriter_start_dtd(xmlwriter, qualifiedName, publicId, systemId) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_start_dtd(xmlwriter, 'html', '-//W3C//DTD XHTML 1.0 Transitional//EN', 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd');
  // *     returns 1: true

  return xmlwriter.startDTD(qualifiedName, publicId, systemId);
}
function xmlwriter_start_dtd_attlist(xmlwriter, name) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_start_dtd_attlist(xmlwriter, 'href');
  // *     returns 1: true

  return xmlwriter.startDTDAttlist(name);
}
function xmlwriter_start_dtd_element(xmlwriter, qualifiedName) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_start_dtd_element(xmlwriter, 'xsl:output');
  // *     returns 1: true

  return xmlwriter.startDTDElement(qualifiedName);
}
function xmlwriter_start_dtd_entity(xmlwriter, name, isparam) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_start_dtd_entity('nbsp', false);
  // *     returns 1: true

  return xmlwriter.startDTDEntity(name, isparam);
}
function xmlwriter_start_element(xmlwriter, name) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_start_element(xmlwriter, 'myElement');
  // *     returns 1: true

  return xmlwriter.startElement(name);
}
function xmlwriter_start_element_ns(xmlwriter, prefix, name, uri) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_start_element_ns(xmlwriter, 'xsl', 'stylesheet', 'http://www.w3.org/1999/XSL/Transform');
  // *     returns 1: true

  return xmlwriter.startElementNS(prefix, name, uri);
}
function xmlwriter_start_pi(xmlwriter, target) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_start_pi(xmlwriter, 'xml-stylesheet');
  // *     returns 1: true

  return xmlwriter.startPI(target);
}
function xmlwriter_text(xmlwriter, content) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_text(xmlwriter, 'some text to write');
  // *     returns 1: true

  return xmlwriter.text(content);
}
function xmlwriter_write_attribute(xmlwriter, name, value) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_write_attribute(xmlwriter, 'href', 'http://www.un.org');
  // *     returns 1: true

  return xmlwriter.writeAttribute(name, value);
}
function xmlwriter_write_attribute_ns(xmlwriter, prefix, name, uri, content) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_write_attribute_ns(xmlwriter, 'xlink', 'type', 'http://www.w3.org/1999/xlink', 'simple');
  // *     returns 1: true

  return xmlwriter.writeAttributeNS(prefix, name, uri, content);
}
function xmlwriter_write_cdata(xmlwriter, content) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_write_cdata(xmlwriter, '&some <CData> content&');
  // *     returns 1: true

  return xmlwriter.writeCData(content);
}
function xmlwriter_write_comment(xmlwriter, content) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_write_comment(xmlwriter, "Here's a comment...");
  // *     returns 1: true

  return xmlwriter.writeComment(content);
}
function xmlwriter_write_dtd(xmlwriter, name, publicId, systemId, subset) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_write_dtd(xmlwriter, 'html', '-//W3C//DTD XHTML 1.1 plus MathML 2.0 plus SVG 1.1//EN', 'http://www.w3.org/2002/04/xhtml-math-svg/xhtml-math-svg.dtd', '<!ENTITY % XHTML.prefixed  "IGNORE" ><!ENTITY % XHTML.prefix    "" >');
  // *     returns 1: true

  return xmlwriter.writeDTD(name, publicId, systemId, subset);
}
function xmlwriter_write_dtd_attlist(xmlwriter, name, content) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_write_dtd_attlist(xmlwriter, 'img', 'src CDATA #REQUIRED\nalt CDATA #REQUIRED');
  // *     returns 1: true

  return xmlwriter.writeDTDAttlist(name, content);
}
function xmlwriter_write_dtd_element(xmlwriter, name, content) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_write_dtd_element('title', '(#PCDATA)');
  // *     returns 1: true

  xmlwriter.writeDTDElement(name, content);
}
function xmlwriter_write_dtd_entity(xmlwriter, name, content, pe, pubid, sysid, ndataid) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_write_dtd_entity(xmlwriter, 'nbsp', '&#160;', false, '', '', '');
  // *     returns 1: true

  return xmlwriter.writeDTDEntity(name, content, pe, pubid, sysid, ndataid);
}
function xmlwriter_write_element(xmlwriter, name, content) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_write_element(xmlwriter, 'div', 'Hello there!');
  // *     returns 1: true

  return xmlwriter.writeElement(name, content);
}
function xmlwriter_write_element_ns(xmlwriter, prefix, name, uri, content) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_write_element_ns(xmlwriter, 'xsl', 'if', 'http://www.w3.org/1999/XSL/Transform', '<br />');
  // *     returns 1: true

  return xmlwriter.writeElementNS(prefix, name, uri, content);
}
function xmlwriter_write_pi(xmlwriter, target, content) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_write_pi(xmlwriter, 'xml-stylesheet', 'href="mystyle.css" type="text/css"');
  // *     returns 1: true

  return xmlwriter.writePI(target, content);
}
function xmlwriter_write_raw(xmlwriter, content) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_write_raw(xmlwriter, '<someRawText>blah</someRawText>');
  // *     returns 1: true

  return xmlwriter.writeRaw(content);
}
