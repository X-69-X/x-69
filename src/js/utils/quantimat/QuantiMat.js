/*
The MIT License (MIT)

Copyright (c) 2022 - 2022 Matias Affolter

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

"use strict";

// Inspired by https://en.wikipedia.org/wiki/Rec._709
var imul = function(a, b){
    "use strict";
    var ah = (a >>> 16) & 0xffff,
        al = a & 0xffff,
        bh = (b >>> 16) & 0xffff,
        bl = b & 0xffff;
    return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
};
var round = Math.round;
var fr = Math.fround;
var p2 = function(x){"use strict"; x = x|0; return imul(x|0, x|0)|0; };
var s = function(x){
    "use strict";
    // Base cases
    x = (x | 0)>>>0;
    if ((x|0) == 0 || (x|0) == 1){

        return x | 0;
    }

    // Starting from 1, try all
    // numbers until i*i is
    // greater than or equal to x.
    var i = 1;
    var result = 1;

    while ((result|0) <= (x|0)) {
        i = (i+1|0)>>>0;
        result = (i * i | 0)>>>0;
    }

    return (i - 1 | 0)>>>0;
};
var PR = fr(0.299), // +0.08
    PG = fr(0.587), // -0.16
    PB = fr( 0.114), // +0.08
    PA = fr(1.0000);

var RD = 255,
    GD = 255,
    BD = 255,
    AD = 255;

// Euclidean or Manhattan color distance
var EUCLMAX = (s(PR*RD*RD + PG*GD*GD + PB*BD*BD | 0) | 0) >>> 0;
var MANHMAX = (PR*RD + PG*GD + PB*BD|0) >>> 0;

function plus_uint(a, b) {
    "use strict";
    a = a | 0;
    b = b | 0;
    return (a + b | 0) >>> 0;
}
function multiply_uint(a, b) {
    "use strict";
    a = a | 0;
    b = b | 0;
    return Math.imul(a, b)|0;
}
function multiply_uint_4(a) {
    "use strict";
    return a << 2;
}
function divide_uint(a, b) {
    "use strict";
    a = a | 0;
    b = b | 0;
    return (a / b | 0) >>> 0;
}
function divide_4_uint(n) {
    "use strict";
    return (n >> 2 | 0) >>>0;
}
function divide_16_uint(n) {
    "use strict";
    return (n >> 4 | 0) >>> 0;
}
function divide_32_uint(n) {
    "use strict";
    return (n >> 5 | 0) >>>0;
}
function divide_64_uint(n) {
    "use strict";
    return (n >> 6 | 0) >>>0;
}
function divide_85_uint(n) {
    "use strict";
    return (n / 85 - 0.012 | 0) >>>0;
}
function divide_128_uint(n) {
    "use strict";
    return (n >> 7 | 0) >>> 0;
}
function clamp_int(x, min, max) {
    "use strict";
    x = x | 0;
    min = min | 0;
    max = max | 0;
    return (x < min ? min: x > max ? max: x) | 0;
}
function clamp_uint8(n) {
    "use strict";
    n = n | 0;
    return (n | 0) & 0xFF;
}
function inverse_255(n) {
    "use strict";
    n = n | 0;
    return (255 - n | 0) & 0xFF;
}
function divide_255(n) {
    "use strict";
    n = n | 0;
    return (n / 255 | 0) & 0xFF;
}
function clamp_uint32(n) {
    "use strict";
    n = n | 0;
    return ((n|0)>>>0) >>> 0;
}
function uint_not_equal(a, b) {
    "use strict";
    a = a | 0;
    b = b | 0;
    return (a | 0) != (b | 0);
}
function uint_equal(a, b) {
    "use strict";
    a = a | 0;
    b = b | 0;
    return (a | 0) == (b | 0);
}
function abs_int(n) {
    "use strict";
    n = n | 0;
    return (n | 0) < 0 ? (-n | 0) : (n | 0);
}


// NEW BASIC : Number object with 4 times 0-255
var SIMDopeColor = function(with_main_buffer, offset_4bytes){
    "use strict";
    offset_4bytes = offset_4bytes || 0;
    if (!(this instanceof SIMDopeColor)) {
        return new SIMDopeColor(with_main_buffer, offset_4bytes);
    }

    if(with_main_buffer instanceof Uint8Array) {

        this.storage_uint8_ =  with_main_buffer;
    }else {

        this.storage_uint8_ = new Uint8Array("buffer" in with_main_buffer ? with_main_buffer.buffer: with_main_buffer, imul(offset_4bytes, 4));
    }
};

SIMDopeColor.new_of = function(r, g, b, a) {
    "use strict";
    var uint8ca = new Uint8ClampedArray(4);
    uint8ca[3] = clamp_uint8(r);
    uint8ca[2] = clamp_uint8(g);
    uint8ca[1] = clamp_uint8(b);
    uint8ca[0] = clamp_uint8(a);
    return SIMDopeColor(uint8ca);
}

// Properties of number object
Object.defineProperty(SIMDopeColor.prototype, 'r', {
    get: function() { "use strict"; return clamp_uint8(this.storage_uint8_[3]); },
});
Object.defineProperty(SIMDopeColor.prototype, 'g', {
    get: function() { "use strict"; return clamp_uint8(this.storage_uint8_[2]); },
});
Object.defineProperty(SIMDopeColor.prototype, 'b', {
    get: function() { "use strict"; return clamp_uint8(this.storage_uint8_[1]); },
});
Object.defineProperty(SIMDopeColor.prototype, 'a', {
    get: function() { "use strict"; return clamp_uint8(this.storage_uint8_[0]); },
});

Object.defineProperty(SIMDopeColor.prototype, 'uint32', {
    get: function() { "use strict";
        return ((this.storage_uint8_[3] << 24) | (this.storage_uint8_[2] << 16) | (this.storage_uint8_[1] <<  8) | this.storage_uint8_[0]) >>> 0;
    }
});

Object.defineProperty(SIMDopeColor.prototype, 'rgbaon4bits', {
    get: function() {
        "use strict";
        var r = divide_128_uint(this.storage_uint8_[3]);
        var g = divide_128_uint(this.storage_uint8_[2]);
        var b = divide_128_uint(this.storage_uint8_[1]);
        var a = divide_128_uint(this.storage_uint8_[0]);

        return ((r << 3) | (g << 2) | (b <<  1) | (a << 0) | 0) >>> 0;
    }
});

Object.defineProperty(SIMDopeColor.prototype, 'rgbaon6bits', {
    get: function() {
        "use strict";
        var r = divide_85_uint(this.storage_uint8_[3]);
        var g = divide_85_uint(this.storage_uint8_[2]);
        var b = divide_85_uint(this.storage_uint8_[1]);
        var a = divide_85_uint(this.storage_uint8_[0]);

        return ((r ^ 0b010000) + (g ^ 0b001000) + (b ^ 0b000100) + (a ^ 0b000000) | 0) >>> 0;
    }
});

Object.defineProperty(SIMDopeColor.prototype, 'rgbaon8bits', {
    get: function() {
        "use strict";
        var r = divide_64_uint(this.storage_uint8_[3]);
        var g = divide_64_uint(this.storage_uint8_[2]);
        var b = divide_64_uint(this.storage_uint8_[1]);
        var a = divide_64_uint(this.storage_uint8_[0]);

        return ((r << 6) | (g << 4) | (b <<  2) | (a << 0) | 0) >>> 0;
    }
});

Object.defineProperty(SIMDopeColor.prototype, 'rgbaon12bits', {
    get: function() {
        "use strict";
        var r = divide_32_uint(this.storage_uint8_[3]);
        var g = divide_32_uint(this.storage_uint8_[2]);
        var b = divide_32_uint(this.storage_uint8_[1]);
        var a = divide_32_uint(this.storage_uint8_[0]);

        return ((r << 9) | (g << 6) | (b <<  3) | (a << 0) | 0) >>> 0;
    }
});

Object.defineProperty(SIMDopeColor.prototype, 'offset', {
    get: function() {"use strict"; return divide_4_uint(this.storage_uint8_.byteOffset);}
});

Object.defineProperty(SIMDopeColor.prototype, 'buffer', {
    get: function() { "use strict"; return this.storage_uint8_.buffer.slice(this.storage_uint8_.byteOffset, plus_uint(this.storage_uint8_.byteOffset, 4)); }
});
Object.defineProperty(SIMDopeColor.prototype, 'subarray', {
    get: function() { "use strict"; return this.storage_uint8_.subarray(0, 4); }
});
Object.defineProperty(SIMDopeColor.prototype, 'set', {
    get: function() { "use strict"; return function(with_buffer) {

        if(with_buffer instanceof SIMDopeColor) {

            this.storage_uint8_.set(new Uint8Array(with_buffer.buffer));

        }else if("subarray" in with_buffer) {

            this.storage_uint8_.set(with_buffer.subarray(0, 4));
        }else {

            this.storage_uint8_.set(with_buffer);
        }
    }}
});
Object.defineProperty(SIMDopeColor.prototype, 'slice', {
    get: function() { "use strict"; return function(start, end) { return this.storage_uint8_.slice(start, end); }}
});

SIMDopeColor.prototype.is_fully_transparent = function() {
    return uint_equal(this.a, 0);
};

SIMDopeColor.prototype.is_not_fully_transparent = function() {
    return uint_not_equal(this.a, 0);
};

SIMDopeColor.prototype.simplify = function(of) {
    var temp = Uint8ClampedArray.of(
        multiply_uint(round(this.a / of), of),
        multiply_uint(round(this.b / of), of),
        multiply_uint(round(this.g / of), of),
        multiply_uint(round(this.r / of), of),
    );
    this.set(temp);
    return this;
}

SIMDopeColor.blend_all = function (base, colors, amounts) {

    var sum_r = base.r, sum_g = base.g, sum_b = base.b, sum_a = base.a, sum_amount = 1;
    var color, amount, length = colors.length|0, i;

    for(i = 0; i < length; i++){
        color = colors[i];
        amount = fr(amounts[i]);
        sum_amount += amount;
        sum_r += color.r * amount | 0;
        sum_g += color.g * amount | 0;
        sum_b += color.b * amount | 0;
        sum_a += color.a * amount | 0;
    }

    var uint8 = Uint8Array.of(
        sum_a / sum_amount | 0,
        sum_b / sum_amount | 0,
        sum_g / sum_amount | 0,
        sum_r / sum_amount | 0
    );

    base.set(uint8);
    for(i = 0; i < length; i++) {
        colors[i].set(uint8);
    }
}

SIMDopeColor.prototype.blend_with = function(added_uint8x4, amount_alpha, should_return_transparent, alpha_addition) {

    "use strict";
    should_return_transparent = should_return_transparent | 0;
    alpha_addition = alpha_addition | 0;
    amount_alpha = amount_alpha | 0;
    added_uint8x4.multiply_a_4096(amount_alpha|0);

    if((should_return_transparent|0)!=0) {

        if(this.is_fully_transparent()) {
            added_uint8x4.set(new ArrayBuffer(4));
        }else if(added_uint8x4.is_fully_transparent()) {
            this.set(new ArrayBuffer(4));
        }
    }else {

        var alpha = (alpha_addition|0) != 0 ?
            divide_uint(plus_uint(this.a, added_uint8x4.a), 2):
            inverse_255(divide_255(imul(inverse_255(added_uint8x4.a), inverse_255(this.a))));

        this.set(SIMDopeColor.merge_scale_of_255_a_fixed(
            added_uint8x4, divide_uint(imul(added_uint8x4.a, 255), alpha),
            this, divide_255(imul(this.a, divide_uint(imul(inverse_255(added_uint8x4.a), 255), alpha))),
            alpha
        ));

        added_uint8x4.set(this);
    }
};

SIMDopeColor.prototype.euclidean_match_with = function(color, threshold_4096) {
    "use strict";

    threshold_4096 = (threshold_4096 | 0) >>> 0;
    if((threshold_4096|0) == 4096) {

        return true;
    }else if((threshold_4096|0) == 0){

        return ((this.uint32|0) == (color.uint32|0));
    }else {

        var ao = ((AD-abs_int(this.a - color.a|0)|0)/AD*PA);
        return (s(
            PR * p2(this.r - color.r | 0) +
            PG * p2(this.g - color.g | 0) +
            PB * p2(this.b - color.b | 0)
        ) / EUCLMAX * 4096 | 0) < (threshold_4096*ao|0);
    }
};

SIMDopeColor.prototype.manhattan_match_with = function(color, threshold_4096) {
    "use strict";

    threshold_4096 = (threshold_4096 | 0) >>> 0;
    if((threshold_4096|0) == 4096) {

        return true;
    }else if((threshold_4096|0) == 0){

        return ((this.uint32|0) == (color.uint32|0));
    }else {

        var ao = ((AD-abs_int(this.a - color.a|0)|0)/AD*PA);
        return ((
            PR * abs_int(this.r - color.r | 0) +
            PG * abs_int(this.g - color.g | 0) +
            PB * abs_int(this.b - color.b | 0) | 0
        ) * 4096 / MANHMAX | 0) < (threshold_4096*ao|0);
    }
};

SIMDopeColor.prototype.multiply_a_4096 = function(n) {
    "use strict";
    this.subarray[0] = clamp_uint8(divide_uint(imul(this.a, n), 4096));
};
SIMDopeColor.prototype.copy = function(a) {
    "use strict";
    return SIMDopeColor(this.slice(0, 4));
};

// get a the number object wile modifying property values
SIMDopeColor.with_a = function(t, a) {
    "use strict";
    var ta = t.slice(0, 4);
    ta[0] = clamp_uint8(a);
    return SIMDopeColor(ta);
};
SIMDopeColor.merge_scale_of_255_a_fixed = function(t1, of1, t2, of2, alpha) {

    of1 = clamp_uint8(of1);
    of2 = clamp_uint8(of2);
    alpha = clamp_uint8(alpha);

    return SIMDopeColor.merge_with_a_fixed(
        SIMDopeColor.scale_rgb_of_on_255(t1, of1, of1, of1),
        SIMDopeColor.scale_rgb_of_on_255(t2, of2, of2, of2),
        alpha
    );
}

SIMDopeColor.scale_rgb_of_on_255 = function(t, of_r, of_g, of_b) {
    return SIMDopeColor(
        Uint8ClampedArray.of(
            0,
            divide_255(imul(t.b, of_b)),
            divide_255(imul(t.g, of_g)),
            divide_255(imul(t.r, of_r))
        )
    );
}

SIMDopeColor.merge_with_a_fixed = function(t1, t2, alpha) {
    return SIMDopeColor(
        Uint8ClampedArray.of(
            clamp_uint8(alpha),
            plus_uint(t1.b, t2.b),
            plus_uint(t1.g, t2.g),
            plus_uint(t1.r, t2.r),
        )
    );
}

var SIMDopeColors = function(with_main_buffer, bytes_offset, bytes_length){
    "use strict";

    if (!(this instanceof SIMDopeColors)) {
        return new SIMDopeColors(with_main_buffer);
    }

    this.storage_ = "buffer" in with_main_buffer ? with_main_buffer.buffer: with_main_buffer;

    bytes_offset = bytes_offset | 0;
    bytes_length = (bytes_length | 0) || (this.storage_.byteLength | 0);

    this.storage_uint8_array_ = new Uint8Array(this.storage_, bytes_offset, bytes_length);
    this.storage_uint32_array_ = new Uint32Array(this.storage_, bytes_offset, divide_4_uint(bytes_length));
};

Object.defineProperty(SIMDopeColors.prototype, 'length', {
    get: function() { "use strict"; return this.storage_uint32_array_.length; }
});
Object.defineProperty(SIMDopeColors.prototype, 'buffer', {
    get: function() { "use strict"; return this.storage_uint8_array_.buffer; }
});
Object.defineProperty(SIMDopeColors.prototype, 'buffer_setUint8', {
    get: function() { "use strict"; return function (i, n) {
        i = i | 0;
        n = n | 0;
        return this.storage_uint8_array_[i] = clamp_uint8(n);
    }}
});
Object.defineProperty(SIMDopeColors.prototype, 'buffer_getUint8', {
    get: function() { "use strict"; return function (i) {
        i = i | 0;
        return this.storage_uint8_array_[i];
    }}
});
Object.defineProperty(SIMDopeColors.prototype, 'buffer_getUint8a', {
    get: function() { "use strict"; return function (i, n) {
        i = i|0;
        n = n|0; n = n || 1;
        n = plus_uint(i, multiply_uint_4(n));
        return this.storage_uint8_array_.subarray(i, n);
    }}
});
Object.defineProperty(SIMDopeColors.prototype, 'buffer_setUint32', {
    get: function() { "use strict"; return function (i, n) {
        this.storage_uint32_array_[i|0] = clamp_uint32(n);
    }}
});
Object.defineProperty(SIMDopeColors.prototype, 'buffer_getUint32', {
    get: function() { "use strict"; return function (i) {
        return  this.storage_uint32_array_[i|0];
    }}
});
Object.defineProperty(SIMDopeColors.prototype, 'subarray_uint32', {
    get: function() { "use strict"; return function (start, end){ start = start|0; end = end | 0; end = end || this.length; return this.storage_uint32_array_.subarray(start, end); }}
});
Object.defineProperty(SIMDopeColors.prototype, 'slice_uint32', {
    get: function() { "use strict"; return function (start, end){ start = start|0; end = end | 0; end = end || this.length; return this.storage_uint32_array_.slice(start, end); }}
});
Object.defineProperty(SIMDopeColors.prototype, 'subarray_uint8', {
    get: function() { "use strict"; return function (start, end){ start = start | 0; end = end | 0; return this.storage_uint8_array_.subarray(multiply_uint_4(start), multiply_uint_4(end)); }}
});
Object.defineProperty(SIMDopeColors.prototype, 'slice_uint8', {
    get: function() { "use strict"; return function (start, end){ start = start | 0; end = end | 0; return this.storage_uint8_array_.slice(multiply_uint_4(start), multiply_uint_4(end)); }}
});

SIMDopeColors.prototype.get_element = function (i) {
    return SIMDopeColor(this.buffer, i|0);
}
SIMDopeColors.prototype.subarray = function (i, n) {
    i = i | 0;
    n = n | 0;
    return this.buffer_getUint8a(i, n);
}

var QuantiMat = function(opts) {
    "use strict";
    opts = opts || {};

    if (!(this instanceof QuantiMat)) {
        return new QuantiMat(opts);
    }

    opts.pxl_colors = opts.pxl_colors || new Uint32Array(0);
    opts.pxls = opts.pxls || new Uint32Array(0);
    this.new_pxls_ = "buffer" in opts.pxls ? new Uint32Array(opts.pxls.buffer) : Uint32Array.from(opts.pxls);
    this.new_pxl_colors_ = "buffer" in opts.pxl_colors ? SIMDopeColors(opts.pxl_colors.buffer) : SIMDopeColors(Uint32Array.from(opts.pxl_colors));

    this.is_bucket_threshold_auto_ = Boolean(opts.bucket_threshold > 4096);
    opts.bucket_threshold = opts.bucket_threshold || 0;
    opts.bucket_threshold = (opts.bucket_threshold|0) >= 1 ? (opts.bucket_threshold | 0):  opts.this_state_bucket_threshold || 0;

    this.bucket_threshold_ = this.is_bucket_threshold_auto_ ? 1: opts.bucket_threshold;
    this.threshold_steps_ = this.is_bucket_threshold_auto_ ? 1: this.new_pxl_colors_.length > 16384 ? 1: this.new_pxl_colors_.length > 8192 ? 2: this.new_pxl_colors_.length > 2048 ? 3: this.new_pxl_colors_.length > 512 ? 4: 5;
    this.best_color_number_ = this.new_pxl_colors_.length / 2 + opts.color_number_bonus | 0;

    this.max_cluster_ = this.new_pxl_colors_.length > 16384 ? 4096+1: this.new_pxl_colors_.length > 8192 ? 256+1: this.new_pxl_colors_.length > 2048 ? 64+1: this.new_pxl_colors_.length > 512 ? 16+1: 1;
    this.index_clusters_ = new Array(this.max_cluster_);
    this.length_clusters_ = new Uint32Array(this.max_cluster_);

    this.pxl_colors_usage_ = new Uint32Array(this.new_pxl_colors_.length);
    this.all_index_clusters_ = new Uint32Array(this.new_pxl_colors_.length);
    this.clean_pxl_colors_ = new Uint32Array(this.new_pxl_colors_.length);
    this.clean_pxl_colors_lookup_ = {};

    /*
    // We will compute how "frequent" the color-set of each cluster is within area of 16x16
    this.area_size = 16;
    this.height = opts.height;
    this.width = opts.width;
    this.area_x_length = 1+this.width/this.area_size|0;
    this.area_y_length = 1+this.height/this.area_size|0;
    this.area_boxes = new Array(this.area_x_length * this.area_y_length).fill(new Uint8Array(this.max_cluster_))
     */
};

Object.defineProperty(QuantiMat.prototype, 'reset_deduplicate', {
    get: function() { "use strict"; return function(length) {
        "use strict";
        this.clean_pxl_colors_lookup_ = {};
        this.pxl_colors_usage_.fill(0, 0, length|0);
        this.clean_pxl_colors_.fill(0, 0, length|0);
    }}
});
Object.defineProperty(QuantiMat.prototype, 'index_of_color_within_cleaned', {
    get: function() { "use strict"; return function(color) {
        "use strict";
        return (this.clean_pxl_colors_lookup_[(color|0)>>>0]|0) - 1 | 0;
    }}
});
Object.defineProperty(QuantiMat.prototype, 'set_cleaned_pxl_colors', {
    get: function() { "use strict"; return function(index, color) {
        "use strict";
        this.clean_pxl_colors_[(index|0)>>>0] = (color|0) >>> 0;
        this.clean_pxl_colors_lookup_[(color|0)>>>0] = (index+1|0)>>>0;
    }}
});
Object.defineProperty(QuantiMat.prototype, 'increase_color_usage', {
    get: function() { "use strict"; return function(color_index) {
        "use strict";
        this.pxl_colors_usage_[(color_index|0)>>>0] = (this.pxl_colors_usage_[(color_index|0)>>>0]+1|0)>>>0;
    }}
});
Object.defineProperty(QuantiMat.prototype, 'set_new_pxls', {
    get: function() { "use strict"; return function(pixel_index, color_index) {
        "use strict";
        this.new_pxls_[(pixel_index|0)>>>0] = (color_index | 0) >>> 0;
    }}
});
Object.defineProperty(QuantiMat.prototype, 'set_new_pxl_colors', {
    get: function() { "use strict"; return function(pxl_colors_length) {
        "use strict";
        this.new_pxl_colors_ = SIMDopeColors(this.clean_pxl_colors_.buffer.slice(0, multiply_uint_4(pxl_colors_length|0)));
    }}
});
Object.defineProperty(QuantiMat.prototype, 'get_a_new_pxl_color_from_pxl_index', {
    get: function() {return function(index){return this.new_pxl_colors_.buffer_getUint32(this.new_pxls_[index|0])&0xFFFFFFFF;}}
});

Object.defineProperty(QuantiMat.prototype, 'reset_cluster', {
    get: function() { "use strict"; return function() {
        "use strict";
        this.max_cluster_ = this.new_pxl_colors_.length > 16384 ? 4096+1: this.new_pxl_colors_.length > 8192 ? 256+1: this.new_pxl_colors_.length > 2048 ? 64+1: this.new_pxl_colors_.length > 512 ? 16+1: 1;
        this.length_clusters_.fill(0, 0, this.max_cluster|0);
        for(var c = 0; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){ this.index_clusters_[c|0] = [];}
    }}
});
Object.defineProperty(QuantiMat.prototype, 'add_in_indexes_cluster', {
    get: function() { "use strict"; return function(cluster_index, color_index) {
        "use strict";
        this.index_clusters_[(cluster_index|0)>>>0].push((color_index|0)>>>0);
    }}
});
Object.defineProperty(QuantiMat.prototype, 'set_all_cluster_indexes', {
    get: function() { "use strict"; return function() {
        "use strict";
        var c = 0;
        var offset = 0;
        for(c = 0; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){
            this.all_index_clusters_.set(this.index_clusters_[(c|0)>>>0], (offset|0)>>>0);
            offset = (offset + this.get_length_in_index_clusters(c|0) | 0) >>> 0;
        }

    }}
});
Object.defineProperty(QuantiMat.prototype, 'get_length_in_index_clusters', {
    get: function() { "use strict"; return function(i) {
        "use strict";
        return (this.index_clusters_[(i|0)>>>0].length | 0) >>> 0;
    }}
});
Object.defineProperty(QuantiMat.prototype, 'get_in_cluster_lengths', {
    get: function() { "use strict"; return function(cluster_index) {
        "use strict";
        return (this.length_clusters_[(cluster_index|0)>>>0]|0)>>>0;
    }}
});
Object.defineProperty(QuantiMat.prototype, 'get_an_index_in_clusters', {
    get: function() {return function(index){return (this.all_index_clusters_[index|0] | 0)>>>0;}}
});
Object.defineProperty(QuantiMat.prototype, 'get_a_color_usage', {
    get: function() {return function(index){return (this.pxl_colors_usage_[index|0] | 0) >>> 0;}}
});
Object.defineProperty(QuantiMat.prototype, 'set_a_color_usage', {
    get: function() {return function(index, usage){return this.pxl_colors_usage_[index|0] = (usage|0)>>>0;}}
});
Object.defineProperty(QuantiMat.prototype, 'get_a_color_usage_percent', {
    get: function() {return function(index){return this.pxl_colors_usage_[index|0] / this.new_pxls_.length;}}
});
Object.defineProperty(QuantiMat.prototype, 'get_average_color_usage_percent', {
    get: function() {return function(start, stop){

        start = start | 0;
        stop = stop | 0;
        stop = (stop < start ? this.pxl_colors_usage_.length: stop) | 0;

        var p = 0.0;
        var x = 0;
        var index_of_color_a = 0;

        for(x = start|0; (x|0) < (stop|0); x = (x+1|0)>>>0) {

            index_of_color_a = (this.get_an_index_in_clusters((x | 0) >>> 0) | 0) >>> 0;
            p += this.pxl_colors_usage_[index_of_color_a|0] / this.new_pxls_.length;
        }

        return p / (stop-start|0);
    }}
});
Object.defineProperty(QuantiMat.prototype, 'get_a_new_pxl_color', {
    get: function() {return function(index){return this.new_pxl_colors_.get_element(index|0);}}
});
Object.defineProperty(QuantiMat.prototype, 'max_cluster', {
    get: function() {return this.max_cluster_ | 0;}
});
Object.defineProperty(QuantiMat.prototype, 'threshold_steps', {
    get: function() {return this.threshold_steps_ | 0;}
});
Object.defineProperty(QuantiMat.prototype, 'new_pxls_length', {
    get: function() {return this.new_pxls_.length | 0;}
});
Object.defineProperty(QuantiMat.prototype, 'new_pxl_colors_length', {
    get: function() {return this.new_pxl_colors_.length | 0;}
});
Object.defineProperty(QuantiMat.prototype, 'best_color_number', {
    get: function() {return this.best_color_number_ | 0;}
});
Object.defineProperty(QuantiMat.prototype, 'bucket_threshold', {
    get: function() {return this.bucket_threshold_ | 0;}
});
Object.defineProperty(QuantiMat.prototype, 'is_bucket_threshold_auto', {
    get: function() {return this.is_bucket_threshold_auto_;}
});
Object.defineProperty(QuantiMat.prototype, 'set_bucket_threshold', {
    get: function() {return function(value){
        this.bucket_threshold_ = value | 0;
    }}
});
Object.defineProperty(QuantiMat.prototype, 'get_data', {
    get: function() {return function(){

        return Array.of(this.new_pxls_, this.new_pxl_colors_.slice_uint32(0, this.new_pxl_colors_.length));
    }}
});

QuantiMat.prototype.output = function(format) {

    var format = format || "heap";
    var data = this.get_data();

    if(format == "heap") {

        var array_buffer = new Uint32Array(2+data[0].length+data[1].length);
        array_buffer[0] = data[0].length | 0;
        array_buffer[1] = data[1].length | 0;
        array_buffer.set(data[0], 2);
        array_buffer.set(data[1], 2+data[0].length);

        return array_buffer.buffer;
    }else {

        return data;
    }
}

QuantiMat.prototype.deduplicate = function() {
    "use strict";

    this.reset_deduplicate(this.new_pxl_colors_length|0);

    var clean_pxl_colors_length = 0;
    var color = 0;
    var color_index = 0;
    var not_found = -1;
    var i = 0;
    var npl = this.new_pxls_length | 0;

    // Remove duplicate : repopulate the color palette and rewrite each pixel index
    for(;(i|0) < (npl|0); i = (i + 1 | 0)>>>0) {

        color = this.get_a_new_pxl_color_from_pxl_index(i|0) | 0;
        color_index = this.index_of_color_within_cleaned(color|0) | 0;

        if((color_index|0) == (not_found|0)) {
            this.set_cleaned_pxl_colors(clean_pxl_colors_length|0, color|0);
            color_index = clean_pxl_colors_length | 0;
            clean_pxl_colors_length = clean_pxl_colors_length+1|0;
        }

        this.increase_color_usage(color_index|0);
        this.set_new_pxls(i|0, color_index|0);
    }

    // Set the brand-new colors and length
    this.set_new_pxl_colors(clean_pxl_colors_length);
}

QuantiMat.prototype.clusterize = function() {
    "use strict";

    this.reset_cluster();

    var l = 0;

    if(this.max_cluster === 4096+1) {

        for(; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {

            this.add_in_indexes_cluster((this.get_a_new_pxl_color((l|0)>>>0).rgbaon12bits|0)>>>0, (l|0)>>>0);
        }
    }else if( this.max_cluster ===  256+1) {

        for(; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {

            this.add_in_indexes_cluster((this.get_a_new_pxl_color((l|0)>>>0).rgbaon8bits|0)>>>0, (l|0)>>>0);
        }
    }else if(this.max_cluster === 64+1){

        for(; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {

            this.add_in_indexes_cluster((this.get_a_new_pxl_color((l|0)>>>0).rgbaon6bits|0)>>>0, (l|0)>>>0);
        }
    }else if(this.max_cluster === 16+1){

        for(; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {

            this.add_in_indexes_cluster((this.get_a_new_pxl_color((l|0)>>>0).rgbaon4bits|0)>>>0, (l|0)>>>0);
        }
    }else if(this.max_cluster === 1){

        for(; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {

            this.add_in_indexes_cluster(0, (l|0)>>>0);
        }
    }

    this.set_all_cluster_indexes();
}

QuantiMat.prototype.process_threshold = function(t) {
    "use strict";

    t = (t | 0) >>> 0;
    var threshold_4096 = this.bucket_threshold * (t / this.threshold_steps) | 0;
    var weight_applied_to_color_usage_difference = t / this.threshold_steps;

    var index_merged = false;
    var latest_colors = [];
    var latest_amounts = [];
    var start = 0;
    var stop = 0;
    var color_a, color_b;
    var color_a_usage = 0;
    var color_b_usage = 0;
    var color_usage_difference_positive = 0.0;
    var weighted_threshold = 0.0;
    var index_of_color_a = 0;
    var index_of_color_b = 0;
    var x = 0, y = 0;
    var color_n_in_cluster = 0;

    // 1x Threshold + 1x weight
    weighted_threshold =
        ((
            // Threshold and weight applied to threshold divided by what is not the threshold
            ((threshold_4096 / 4096) + (threshold_4096 / 4096 * weight_applied_to_color_usage_difference)) /
            (1 + weight_applied_to_color_usage_difference)
        ) * 4096 | 0) >>> 0;  // THRESHOLD + THRESHOLD * WEIGHT / 1 + WEIGHT

    for(var c = 0; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){

        color_n_in_cluster = (this.get_length_in_index_clusters(c|0) | 0) >>> 0;
        stop = (start + color_n_in_cluster | 0) >>> 0;

        for(x = start|0; (x|0) < (stop|0); x = (x+1|0)>>>0) {

            index_of_color_a = (this.get_an_index_in_clusters((x|0)>>>0)|0)>>>0;

            // Update color usage and relative variables
            color_a = this.get_a_new_pxl_color((index_of_color_a|0)>>>0);
            color_a_usage = (this.get_a_color_usage((index_of_color_a|0)>>>0) | 0) >>> 0;

            if((color_a_usage|0) > 0) {

                // Start following color snake
                latest_colors = [];

                for(y = start|0; (y|0) < (stop|0); y = (y+1|0)>>>0) {

                    index_of_color_b = this.get_an_index_in_clusters(y)|0;
                    // Update color usage and relative variables
                    color_b = this.get_a_new_pxl_color(index_of_color_b);
                    color_b_usage = this.get_a_color_usage(index_of_color_b)|0;

                    if((color_b_usage|0) > 0) {

                        // The less a color is used the less it requires a great distance to be merged (so we don't have many color used only a few time in the whole image, heavily used color gets preserved better than lowly used ones)
                        if(color_a.manhattan_match_with(color_b,  weighted_threshold|0)) {

                            color_usage_difference_positive = (color_a_usage|0) > (color_b_usage|0) ? color_a_usage / color_b_usage: 1 / color_a_usage / color_b_usage;

                            // Update color usage and relative variables
                            index_merged = true;
                            color_a_usage = color_a_usage+color_b_usage|0;
                            this.set_a_color_usage(index_of_color_b|0, 0);

                            // Adds color to blend to processed colors and stack it to what will be set to be equals with all other color blended
                            latest_colors.push(this.get_a_new_pxl_color(index_of_color_b|0));
                            latest_amounts.push(color_usage_difference_positive);
                        }
                    }
                }
            }

            if(index_merged) {
                this.set_a_color_usage(index_of_color_a|0, color_a_usage|0);
                SIMDopeColor.blend_all(color_a, latest_colors, latest_amounts);
                latest_colors = []; latest_amounts = [];
                index_merged = false;
            }
        }

        start = stop | 0;
    }

    return index_merged;
}


QuantiMat.prototype.round = function() {
    "use strict";

    if(this.new_pxl_colors_length > 512) {

        var simplify_of = this.new_pxl_colors_.length > 16384 ? 16: this.new_pxl_colors_.length > 8192 ? 8: this.new_pxl_colors_.length > 2048 ? 4: this.new_pxl_colors_.length > 512 ? 2: 1;
        for(var l = 0; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {
            this.get_a_new_pxl_color((l|0)>>>0).simplify(simplify_of);
        }
    }
};

QuantiMat.prototype.init = function() {
    "use strict";
    this.round();
    this.deduplicate();
    this.clusterize();
    return this;
};

QuantiMat.prototype.run =  function() {
    "use strict";

    var bucket_threhold_stepover = 5;
    var is_bucket_threshold_auto_goal_reached = false;

    while (!is_bucket_threshold_auto_goal_reached) {

        for (var t = 1; (t|0) <= (this.threshold_steps|0); t = (t+1|0)>>>0) {

            if(this.process_threshold(t|0)) {
                this.deduplicate();
                this.clusterize();
            }
        }

        if(!this.is_bucket_threshold_auto && this.bucket_threshold > this.threshold_steps){

            is_bucket_threshold_auto_goal_reached = true;
        }else if(this.new_pxl_colors_length < this.best_color_number){

            break;
        }

        this.set_bucket_threshold(this.bucket_threshold+bucket_threhold_stepover|0);
    }

    return this;
};

var QuantiMatGlobal = function(
    image_data,
    bucket_threshold,
    threshold_steps,
    color_number_bonus,
    best_color_number,
    this_state_bucket_threshold
) {

    return new Promise(function(resolve){
        "use strict";

        var image_data_uint32 = new Uint32Array(image_data.data.subarray(0, image_data.data.length).reverse().buffer).reverse()
        var color_index = 1;
        var _pxl_colors = new Uint32Array(image_data_uint32.length);
        var pxls = new Uint32Array(image_data_uint32.length);

        for(var i = 0, index_of = -1; (i|0) < (image_data_uint32.length|0); i = (i+1|0)>>>0, index_of = _pxl_colors.indexOf(image_data_uint32[i|0]|0) | 0) {

            if((index_of|0) == -1) {
                _pxl_colors[color_index|0] = image_data_uint32[i|0]|0;
                index_of = (color_index | 0) >>> 0;
                color_index = (color_index + 1 | 0) >>> 0;
            }

            pxls[i|0] = (index_of | 0) >>> 0;
        }

        var result = QuantiMat({
            pxls: pxls,
            pxl_colors: _pxl_colors.slice(0, color_index),
            bucket_threshold: bucket_threshold,
            threshold_steps: threshold_steps,
            color_number_bonus: color_number_bonus,
            best_color_number: best_color_number,
            this_state_bucket_threshold: this_state_bucket_threshold,
            width: image_data.width,
            height: image_data.height
        }).init().run().output("split");

        var res_pxls = result[0];
        var res_pxl_length = res_pxls.length|0;
        var res_pxl_size = res_pxls.length-1|0;
        var res_pxl_colors = result[1];

        pxls = new Uint32Array(res_pxl_length);
        for(var i = 0; (i|0) < (res_pxl_length|0); i = (i+1|0)>>>0) {
            pxls[res_pxl_size-i|0] = (res_pxl_colors[res_pxls[i|0]|0] | 0) >>> 0;
        }

        image_data.data.set(new Uint8Array(pxls.buffer).reverse());
        resolve(image_data);
    });
};

module.exports = {
    QuantiMatGlobal: QuantiMatGlobal,
    QuantiMat: QuantiMat
}