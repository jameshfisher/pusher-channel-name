function validChannelCodePoint(cp) {
  return (48 <= cp && cp <=  57) ||            // 0..9
         (65 <= cp && cp <=  90) ||            // A..Z
         (97 <= cp && cp <= 122) ||            // a..z
         [95, 64, 44, 46, 59].includes(cp);   // _@,.;
}

function encodeCodePoint(cp) {
  return validChannelCodePoint(cp) ?
    String.fromCodePoint(cp) :
    "=" + cp.toString(16).toUpperCase() + ";";
}

function encodeStringComponent(component) {
  var escaped = "";
  for (var char of component) {
    escaped += encodeCodePoint(char.codePointAt(0));
  }
  return escaped;
}

function encodeChannelName(components) {
  return components.map(encodeStringComponent).join("-");
}

module.exports.encodeStringComponent = encodeStringComponent;
module.exports.encodeChannelName = encodeChannelName;
