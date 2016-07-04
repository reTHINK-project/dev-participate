/*
 * Copyright [2015-2017] Fraunhofer Gesellschaft e.V., Institute for
 * Open Communication Systems (FOKUS)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
let colorConversion = {};

colorConversion.rgbToCIE_s = function(rgb) {
    return this.rgbToCIE(rgb.r, rgb.g, rgb.b);
};

colorConversion.rgbToCIE = function(r, g, b) {
    var red = (r > 0.04045) ? Math.pow((r + 0.055) / (1.0 + 0.055), 2.4) : (r / 12.92);
    var green = (g > 0.04045) ? Math.pow((g + 0.055) / (1.0 + 0.055), 2.4) : (g / 12.92);
    var blue = (b > 0.04045) ? Math.pow((b + 0.055) / (1.0 + 0.055), 2.4) : (b / 12.92);

    var X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
    var Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
    var Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;

    var x = X / (X + Y + Z);
    var y = Y / (X + Y + Z);

    return {
        "x": x,
        "y": y
    }
};


colorConversion.cieToRGB_s = function(xy) {
    return this.cieToRGB(xy.x, xy.y);
};

colorConversion.cieToRGB = function(x, y) {
    var brightness = 1;
    var z = 1.0 - x - y;

    var Y = brightness; // The given brightness value
    var X = (Y / y) * x;
    var Z = (Y / y) * z;

    var r = X * 1.656492 - Y * 0.354851 - Z * 0.255038;
    var g = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;
    var b = X * 0.051713 - Y * 0.121364 + Z * 1.011530;

    var max = Math.max(r, g, b);
    r /= max;
    g /= max;
    b /= max;

    r = (r <= 0.0031308) ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
    g = (g <= 0.0031308) ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
    b = (b <= 0.0031308) ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;

    max = Math.max(r, g, b);
    r /= max;
    g /= max;
    b /= max;

    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    return {
        "r": r,
        "g": g,
        "b": b
    }
};


colorConversion.componentToHex= function(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};

colorConversion.rgbToHex_s= function(rgb) {
    return this.rgbToHex(rgb.r, rgb.g, rgb.b);
};

colorConversion.rgbToHex= function(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
};


colorConversion.hexToRgb= function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

export default colorConversion;