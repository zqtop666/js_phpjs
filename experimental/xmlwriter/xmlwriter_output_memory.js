function xmlwriter_output_memory(xmlwriter, flush) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_output_memory(xmlwriter, false);
  // *     returns 1: "<root>Here's the buffer...</root>"

  return xmlwriter.outputMemory(flush);
}
