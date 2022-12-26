"use strict";
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

var fu = function(
    buffer
) {
    "use strict";

    // Inspired by https://en.wikipedia.org/wiki/Rec._709
    var fr = Math.fround;
    var r = Math.round;
    var PR = .2126, // +0.1
        PG = .7152, // -0.2
        PB = .0722, // +0.1
        PA = 1.000;

    var RD = 255,
        GD = 255,
        BD = 255,
        AD = 255;

    // Euclidean or Manhattan color distance
    var EUCLMAX = (Math.sqrt(PR*RD*RD + PG*GD*GD + PB*BD*BD + PA*AD*AD | 0) | 0) >>> 0;
    var MANHMAX = (PR*RD + PG*GD + PB*BD + PA*AD|0) >>> 0;


    function plus_uint(a, b) {
        return (a + b | 0) >>> 0;
    }
    function multiply_uint(a, b) {
        return (a * b | 0) >>> 0;
    }
    function multiply_uint_4(a) {
        return a << 2;
    }
    function divide_uint(a, b) {
        return (a / b | 0) >>> 0;
    }
    function divide_four_uint(n) {
        return (n >> 2 | 0) >>> 0;
    }
    function clamp_uint8(n) {
        return (n | 0) & 0xFF;
    }
    function inverse_255(n) {
        return (255 - n | 0) & 0xFF;
    }
    function divide_255(n) {
        return (n / 255 | 0) & 0xFF;
    }
    function clamp_uint32(n) {
        return ((n|0)>>>0) & 0xFFFFFFFF;
    }
    function uint_equal(a, b) {
        return ((a | 0) >>> 0) == ((b | 0) >>> 0);
    }
    function abs_int(n) {
        return (n | 0) < 0 ? (-n | 0) >>> 0 : (n | 0) >>> 0;
    }


// NEW BASIC : Number object with 4 times 0-255
    var SIMDopeColor = function(with_main_buffer, offset_4bytes){
        "use strict";
        offset_4bytes = offset_4bytes || 0;
        if (!(this instanceof SIMDopeColor)) {
            return new SIMDopeColor(with_main_buffer, offset_4bytes);
        }

        if(with_main_buffer instanceof Uint8ClampedArray) {

            this.storage_uint8_ =  with_main_buffer;
        }else {

            this.storage_uint8_ = new Uint8ClampedArray("buffer" in with_main_buffer ? with_main_buffer.buffer: with_main_buffer, multiply_uint(offset_4bytes, 4));
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
            var r = divide_four_uint(divide_four_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[3]))));
            var g = divide_four_uint(divide_four_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[2]))));
            var b = divide_four_uint(divide_four_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[1]))));
            var a = divide_four_uint(divide_four_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[0]))));

            return ((r << 3) | (g << 2) | (b <<  1) | (a << 0) | 0) >>> 0;
        }
    });

    Object.defineProperty(SIMDopeColor.prototype, 'rgbaon8bits', {
        get: function() {
            "use strict";
            var r = divide_four_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[3])));
            var g = divide_four_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[2])));
            var b = divide_four_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[1])));
            var a = divide_four_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[0])));

            return ((r << 6) | (g << 4) | (b <<  2) | (a << 0) | 0) >>> 0;
        }
    });

    Object.defineProperty(SIMDopeColor.prototype, 'rgbaon12bits', {
        get: function() {
            "use strict";
            var r = divide_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[3])), 2);
            var g = divide_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[2])), 2);
            var b = divide_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[1])), 2);
            var a = divide_uint(divide_four_uint(divide_four_uint(this.storage_uint8_[0])), 2);

            return ((r << 9) | (g << 6) | (b <<  3) | (a << 0) | 0) >>> 0;
        }
    });

    Object.defineProperty(SIMDopeColor.prototype, 'offset', {
        get: function() {"use strict"; return divide_four_uint(this.storage_uint8_.byteOffset);}
    });

    Object.defineProperty(SIMDopeColor.prototype, 'buffer', {
        get: function() { "use strict"; return this.storage_uint8_.buffer.slice(this.storage_uint8_.byteOffset, plus_uint(this.storage_uint8_.byteOffset, 4)); }
    });

    Object.defineProperty(SIMDopeColor.prototype, 'set', {
        get: function() { "use strict"; return function(with_buffer) {

            if(with_buffer instanceof SIMDopeColor) {

                this.storage_uint8_[3] = clamp_uint8(with_buffer.r);
                this.storage_uint8_[2] = clamp_uint8(with_buffer.g);
                this.storage_uint8_[1] = clamp_uint8(with_buffer.b);
                this.storage_uint8_[0] = clamp_uint8(with_buffer.a);

            }else if("subarray" in with_buffer) {

                this.storage_uint8_[3] = clamp_uint8(with_buffer[3]);
                this.storage_uint8_[2] = clamp_uint8(with_buffer[2]);
                this.storage_uint8_[1] = clamp_uint8(with_buffer[1]);
                this.storage_uint8_[0] = clamp_uint8(with_buffer[0]);

            }else if("slice" in with_buffer) {

                this.storage_uint8_.set(with_buffer.slice(0, 4));
            }else {

                this.storage_uint8_.set(with_buffer);
            }
        }}
    });
    Object.defineProperty(SIMDopeColor.prototype, 'subarray', {
        get: function() { "use strict"; return function(start, end) { return this.storage_uint8_.subarray(start, end); }}
    });
    Object.defineProperty(SIMDopeColor.prototype, 'slice', {
        get: function() { "use strict"; return function(start, end) { return this.storage_uint8_.slice(start, end); }}
    });

    SIMDopeColor.prototype.is_fully_transparent = function() {
        return uint_equal(this.a, 0);
    };

    SIMDopeColor.prototype.simplify = function(of) {
        var temp = Uint8ClampedArray.of(
            multiply_uint(r(this.a / of), of),
            multiply_uint(r(this.b / of), of),
            multiply_uint(r(this.g / of), of),
            multiply_uint(r(this.r / of), of),
        );
        this.set(temp);
        return this;
    }

    SIMDopeColor.prototype.blend_with = function(added_uint8x4, amount_alpha, should_return_transparent, alpha_addition) {

        alpha_addition = alpha_addition | 0;
        added_uint8x4.multiply_a_1000(amount_alpha|0);

        if(should_return_transparent) {

            if(this.is_fully_transparent()) {

                added_uint8x4.set(this);
                return this;
            }else if(added_uint8x4.is_fully_transparent()) {

                this.set(added_uint8x4);
                return this;
            }
        }

        var alpha = (alpha_addition|0) > 0 ?
            divide_uint(plus_uint(this.a, added_uint8x4.a), 2):
            inverse_255(divide_255(multiply_uint(inverse_255(added_uint8x4.a), inverse_255(this.a))));

        this.set(SIMDopeColor.merge_scale_of_255_a_fixed(
            added_uint8x4, divide_uint(multiply_uint(added_uint8x4.a, 255), alpha),
            this, divide_255(multiply_uint(this.a, divide_uint(multiply_uint(inverse_255(added_uint8x4.a), 255), alpha))),
            alpha
        ));

        added_uint8x4.set(this);

        return this;
    };

    SIMDopeColor.prototype.euclidean_match_with = function(color, threshold_1000) {
        "use strict";

        threshold_1000 = (threshold_1000 | 0) >>> 0;
        if((threshold_1000|0) == 1000) {

            return true;
        }else if((threshold_1000|0) == 0){

            return ((this.uint32|0) == (color.uint32|0));
        }else {

            return (Math.sqrt(
                PR * Math.pow(this.r - color.r | 0, 2) +
                PG * Math.pow(this.g - color.g | 0, 2) +
                PB * Math.pow(this.b - color.b | 0, 2) +
                PA * Math.pow(this.a - color.a | 0, 2)
            ) / EUCLMAX * 1000 | 0) < (threshold_1000|0);
        }
    };

    SIMDopeColor.prototype.manhattan_match_with = function(color, threshold_1000) {
        "use strict";

        threshold_1000 = (threshold_1000 | 0) >>> 0;
        if((threshold_1000|0) == 1000) {

            return true;
        }else if((threshold_1000|0) == 0){

            return ((this.uint32|0) == (color.uint32|0));
        }else {

            return ((
                PR * abs_int(this.r - color.r | 0) +
                PG * abs_int(this.g - color.g | 0) +
                PB * abs_int(this.b - color.b | 0) +
                PA * abs_int(this.a - color.a | 0) | 0
            ) / MANHMAX * 1000 | 0) < (threshold_1000|0);
        }
    };

    SIMDopeColor.prototype.multiply_a_1000 = function(n) {
        "use strict";
        var uint8a = this.subarray();
        uint8a[0] = clamp_uint8(divide_uint(multiply_uint(uint8a[0], n), 1000));
        return this;
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
                divide_255(multiply_uint(t.b, of_b)),
                divide_255(multiply_uint(t.g, of_g)),
                divide_255(multiply_uint(t.r, of_r))
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
        this.storage_uint32_array_ = new Uint32Array(this.storage_, bytes_offset, divide_four_uint(bytes_length));
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

        this.bucket_threshold_auto_goal_target_ = 1;
        this.is_bucket_threshold_auto_ = Boolean(opts.bucket_threshold === 0xFFFFFFFF);
        this.this_state_bucket_threshold_ = opts.this_state_bucket_threshold || 0;
        opts.bucket_threshold = opts.bucket_threshold || 0;
        opts.bucket_threshold = (opts.bucket_threshold|0) >= 1 ? (opts.bucket_threshold | 0): (this.this_state_bucket_threshold_ | 0);
        this.bucket_threshold_ = (this.is_bucket_threshold_auto_ ? this.bucket_threshold_auto_goal_target_: opts.bucket_threshold)|0;
        this.threshold_steps_ = opts.threshold_steps || (this.is_bucket_threshold_auto_ ? 1: 8);
        this.color_number_bonus_ = opts.color_number_bonus | 0;
        this.best_color_number_ = (opts.best_color_number || opts.pxl_colors.length / 2) + this.color_number_bonus_ | 0;

        this.new_pxls_ = "buffer" in opts.pxls ? new Uint32Array(opts.pxls.buffer) : Uint32Array.from(opts.pxls);
        this.new_pxl_colors_ = "buffer" in opts.pxl_colors ? SIMDopeColors(opts.pxl_colors.buffer) : SIMDopeColors(Uint32Array.from(opts.pxl_colors));

        this.max_cluster_length_ = 0;
        this.max_cluster_ = 0;
        this.index_clusters_ = new Array(4096+1);
        this.length_clusters_ = new Uint32Array(4096+1);

        this.pxl_colors_usage_ = new Uint32Array(this.new_pxl_colors_.length);
        this.all_index_clusters_ = new Uint32Array(this.new_pxl_colors_.length);
        this.clean_pxl_colors_ = new Uint32Array(this.new_pxl_colors_.length);
        this.clean_pxl_colors_lookup_ = new Map();
    };

    Object.defineProperty(QuantiMat.prototype, 'reset_deduplicate', {
        get: function() { "use strict"; return function(length) {
            "use strict";
            this.pxl_colors_usage_.fill(0, 0, length|0);
            this.clean_pxl_colors_lookup_.clear();
            if(length === this.clean_pxl_colors_.length) {

                this.clean_pxl_colors_.fill(0);
            }else {

                this.clean_pxl_colors_ = new Uint32Array(length|0);
            }
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'index_of_color_within_cleaned', {
        get: function() { "use strict"; return function(color) {
            "use strict";
            return (this.clean_pxl_colors_lookup_.get((color|0)>>>0) || -1) | 0;
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'set_cleaned_pxl_colors', {
        get: function() { "use strict"; return function(index, color) {
            "use strict";
            this.clean_pxl_colors_[(index|0)>>>0] = (color|0) >>> 0;
            this.clean_pxl_colors_lookup_.set((color|0)>>>0, (index|0)>>>0);
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
            this.max_cluster_ = this.new_pxl_colors_.length > 16384 ? 4096+1: this.new_pxl_colors_.length > 4096 ? 256+1: this.new_pxl_colors_.length > 256 ? 16+1: 1;
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
    Object.defineProperty(QuantiMat.prototype, 'get_a_color_usage_percent', {
        get: function() {return function(index){return fr(this.pxl_colors_usage_[index|0] / this.new_pxls_.length);}}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_average_color_usage_percent', {
        get: function() {return function(start, stop){

            var p = 0.0;
            var x = 0;
            var index_of_color_a = 0;

            for(x = start; (x|0) < (stop|0); x = (x+1|0)>>>0) {

                index_of_color_a = (this.get_an_index_in_clusters((x | 0) >>> 0) | 0) >>> 0;
                p += this.pxl_colors_usage_[index_of_color_a|0] / this.new_pxls_.length;
            }

            return fr(p / (stop-start|0));
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
        get: function() {return this.is_bucket_threshold_auto_ | 0;}
    });
    Object.defineProperty(QuantiMat.prototype, 'set_bucket_threshold', {
        get: function() {return function(value){
            this.bucket_threshold_ = value | 0;
        }}
    });
    Object.defineProperty(QuantiMat.prototype, 'get_data', {
        get: function() {return function(){

            var array_buffer = new Uint32Array(2+this.new_pxls_.length+this.new_pxl_colors_.length);
                array_buffer[0] = (this.new_pxls_.length | 0) & 0xFFFFFFFF;
                array_buffer[1] = (this.new_pxl_colors_.length | 0) & 0xFFFFFFFF;
                array_buffer.set(this.new_pxls_, 2);
                array_buffer.set(this.new_pxl_colors_.slice_uint32(0, this.new_pxl_colors_.length), 2+this.new_pxls_.length);

            return array_buffer.buffer;
        }}
    });

    QuantiMat.prototype.deduplicate = function() {
        "use strict";

        this.reset_deduplicate(this.new_pxl_colors_length|0);

        var clean_pxl_colors_length = 0;
        var color = 0;
        var color_index = 0;
        var not_found = -1;
        var i = 0;

        // Remove duplicate : repopulate the color palette and rewrite each pixel index
        for(;(i|0) < (this.new_pxls_length|0); i = (i + 1 | 0)>>>0) {

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
        var threshold_1000 = this.bucket_threshold * (t / this.threshold_steps) | 0;
        var weight_applied_to_color_usage_difference = Math.fround(t / this.threshold_steps);

        var index_merged = new Set();
        var accumulator_colors = new Set();
        var accumulator_usages = 0;
        var start = 0;
        var stop = 0;
        var color_a, color_b;
        var color_a_usage = 0;
        var color_a_usage_percent = 0;
        var color_b_usage = 0;
        var first_color_more_used = false;
        var color_usage_difference = 0.0;
        var color_usage_difference_magic = 0.0;
        var weighted_threshold = 0.0;
        var average_cluster_color_usage_percent = 0.0;
        var index_of_color_a = 0;
        var index_of_color_b = 0;
        var x = 0, y = 0;
        var i = 0, color_iterator = 0;
        var color_n_in_cluster = 0;
        var weighted_threshold_bonus_preserve_frequent_color_weight = 0.0;

        for(var c = 0; (c|0) < (this.max_cluster|0); c=(c+1|0)>>>0){

            color_n_in_cluster = this.get_length_in_index_clusters(c|0) | 0;
            stop = (start + color_n_in_cluster | 0) >>> 0;

            for(x = start; (x|0) < (stop|0); x = (x+1|0)>>>0) {

                average_cluster_color_usage_percent = this.get_average_color_usage_percent(start|0, stop|0);
                index_of_color_a = (this.get_an_index_in_clusters((x|0)>>>0)|0)>>>0;
                accumulator_colors.clear();

                if(!index_merged.has(index_of_color_a|0)){

                    color_a = this.get_a_new_pxl_color((index_of_color_a|0)>>>0);
                    color_a_usage = (this.get_a_color_usage((index_of_color_a|0)>>>0) | 0) >>> 0;
                    color_a_usage_percent = this.get_a_color_usage_percent((index_of_color_a|0)>>>0);
                    weighted_threshold_bonus_preserve_frequent_color_weight = (6 * average_cluster_color_usage_percent * 4 * color_a_usage_percent) / 10;
                    accumulator_usages = 0;

                    for(y = (x|0)>>>0; (y|0) < (stop|0); y = (y+1|0)>>>0) {

                        index_of_color_b = (this.get_an_index_in_clusters((y|0)>>>0)|0)>>>0;

                        if(!index_merged.has(index_of_color_b|0)){

                            color_b = this.get_a_new_pxl_color((index_of_color_b|0)>>>0);
                            color_b_usage = (this.get_a_color_usage((index_of_color_b|0)>>>0) | 0) >>> 0;

                            first_color_more_used = (color_a_usage|0) > (color_b_usage|0);
                            color_usage_difference = (first_color_more_used ? color_a_usage / color_b_usage: color_b_usage / color_a_usage) * 1000 | 0;

                            // We have a color usage difference that gets attracted to be near half difference, stronger if more distant from above or below the middle line --> 1 (+/-) 1/2
                            color_usage_difference_magic = color_usage_difference + ((color_usage_difference >= 500 ? -color_usage_difference: +color_usage_difference) / (1000/Math.abs(color_usage_difference-500|0))) | 0; //
                            color_usage_difference_magic = ((color_usage_difference_magic|0) < 1 ? 1: (color_usage_difference_magic|0) > 999 ? 999: color_usage_difference_magic) | 0;

                            // 50% threshold + 25% color_usage_difference + 25% color_usage_percentage
                            weighted_threshold = ((
                                ((threshold_1000 / 1000) + (threshold_1000 / 1000 * (1 - color_usage_difference_magic/1000) * weight_applied_to_color_usage_difference)) /
                                (1 + weight_applied_to_color_usage_difference)
                            ) * 1000 | 0)>>>0;  // THRESHOLD + THRESHOLD * WEIGHT / 1 + WEIGHT

                            // The less a color is used the less it requires a great distance to be merged (so we don't have many color used only a few time in the whole image, heavily used color gets preserved better than lowly used ones)
                            if(color_a.euclidean_match_with(color_b,  (6*weighted_threshold+4*weighted_threshold*weighted_threshold_bonus_preserve_frequent_color_weight)/10|0)) {

                                index_merged.add(index_of_color_b);
                                accumulator_colors.add(color_b)

                                if(first_color_more_used) {
                                    color_a.blend_with(color_b, color_usage_difference, false, false);
                                }else {
                                    color_b.blend_with(color_a, color_usage_difference, false, false);
                                }
                            }
                        }
                    }

                    color_iterator = accumulator_colors.values();
                    for(i = 0; (i|0) < (accumulator_colors.size|0); i = (i+1|0)>>>0) {

                        color_iterator.next().value.set(color_a);
                    }

                    index_merged.add(index_of_color_a);
                }
            }

            start = stop | 0;
        }

        return index_merged.size > 0;
    }


    QuantiMat.prototype.round = function() {
        "use strict";

        if(this.new_pxl_colors_length > 4096) {

            var simplify_of = this.new_pxl_colors_.length > 32768 ? 9.6: this.new_pxl_colors_.length > 16384 ? 4.8: this.new_pxl_colors_.length > 8192 ? 3.2: this.new_pxl_colors_.length > 4096 ? 1.6: 1;
            for(var l = 0; (l|0) < (this.new_pxl_colors_length|0); l = (l+1|0)>>>0) {
                this.get_a_new_pxl_color((l|0)>>>0).simplify(simplify_of|0);
            }
        }
    };

    QuantiMat.prototype.init = function() {
        "use strict";
        this.round();
        return this;
    };

    QuantiMat.prototype.run =  function() {
        "use strict";

        var bucket_threhold_stepover = 4;
        var is_bucket_threshold_auto_goal_reached = false;
        var colors_changed = true;

        while (!is_bucket_threshold_auto_goal_reached) {

            for (var t = 1; (t|0) <= (this.threshold_steps|0); t = (t+1|0)>>>0) {

                if(colors_changed) {
                    this.deduplicate();
                    this.clusterize();
                }

                colors_changed = this.process_threshold(t|0);
            }

            if(this.new_pxl_colors_length < this.best_color_number || !this.is_bucket_threshold_auto){

                is_bucket_threshold_auto_goal_reached = true;
            }else if(this.new_pxl_colors_length > this.best_color_number){

                this.set_bucket_threshold(this.bucket_threshold+bucket_threhold_stepover|0);
            }
        }

        return this.get_data();
    };

    var data_view = new Uint32Array(buffer);
    var pxls_length = data_view[0];
    var pxl_colors_length = data_view[1];
    var bucket_threshold = data_view[2];
    var threshold_steps = data_view[3];
    var color_number_bonus = data_view[4];
    var best_color_number = data_view[5];
    var this_state_bucket_threshold = data_view[6];
    var pxls = data_view.slice(6, 6+pxls_length);
    var pxl_colors = data_view.slice(6+pxls_length, 6+pxls_length+pxl_colors_length);

    return new Promise(function(resolve){
        "use strict";

        resolve(QuantiMat({
            pxls,
            pxl_colors,
            bucket_threshold,
            threshold_steps,
            color_number_bonus,
            best_color_number,
            this_state_bucket_threshold
        }).init().run());

    });
};

const ReducePalette = {

    _create_state: function (
        pool,
        pxls,
        pxl_colors,
        bucket_threshold,
        threshold_steps,
        color_number_bonus,
        best_color_number,
        state_bucket_threshold
    ) {

        return Object.assign({}, {
            // Compute properties
            workerp: pool,
            p: pxls,
            pc: pxl_colors,
            bt: bucket_threshold,
            ts: threshold_steps,
            cnb: color_number_bonus,
            bcn: best_color_number,
            stb: state_bucket_threshold
        });
    },
    _create_func: function (){

        const AFunction = Object.getPrototypeOf( function(){}).constructor;
        const asyncs = `var t=function(t){"use strict";var e=Math.fround,r=Math.round,n=.2126,_=.7152,o=.0722,s=(0|Math.sqrt(130050))>>>0;function i(t,e){return(t+e|0)>>>0}function u(t,e){return(t*e|0)>>>0}function l(t){return t<<2}function h(t,e){return(t/e|0)>>>0}function c(t){return(t>>2|0)>>>0}function a(t){return 255&(0|t)}function p(t){return 255&(255-t|0)}function f(t){return 255&(t/255|0)}function g(t){return(0|t)<0?(0|-t)>>>0:(0|t)>>>0}var y=function(t,e){if(e=e||0,!(this instanceof y))return new y(t,e);t instanceof Uint8ClampedArray?this.storage_uint8_=t:this.storage_uint8_=new Uint8ClampedArray("buffer"in t?t.buffer:t,u(e,4))};y.new_of=function(t,e,r,n){var _=new Uint8ClampedArray(4);return _[3]=a(t),_[2]=a(e),_[1]=a(r),_[0]=a(n),y(_)},Object.defineProperty(y.prototype,"r",{get:function(){return a(this.storage_uint8_[3])}}),Object.defineProperty(y.prototype,"g",{get:function(){return a(this.storage_uint8_[2])}}),Object.defineProperty(y.prototype,"b",{get:function(){return a(this.storage_uint8_[1])}}),Object.defineProperty(y.prototype,"a",{get:function(){return a(this.storage_uint8_[0])}}),Object.defineProperty(y.prototype,"uint32",{get:function(){return(this.storage_uint8_[3]<<24|this.storage_uint8_[2]<<16|this.storage_uint8_[1]<<8|this.storage_uint8_[0])>>>0}}),Object.defineProperty(y.prototype,"rgbaon4bits",{get:function(){return(c(c(c(c(this.storage_uint8_[3]))))<<3|c(c(c(c(this.storage_uint8_[2]))))<<2|c(c(c(c(this.storage_uint8_[1]))))<<1|c(c(c(c(this.storage_uint8_[0]))))<<0|0)>>>0}}),Object.defineProperty(y.prototype,"rgbaon8bits",{get:function(){return(c(c(c(this.storage_uint8_[3])))<<6|c(c(c(this.storage_uint8_[2])))<<4|c(c(c(this.storage_uint8_[1])))<<2|c(c(c(this.storage_uint8_[0])))<<0|0)>>>0}}),Object.defineProperty(y.prototype,"rgbaon12bits",{get:function(){return(h(c(c(this.storage_uint8_[3])),2)<<9|h(c(c(this.storage_uint8_[2])),2)<<6|h(c(c(this.storage_uint8_[1])),2)<<3|h(c(c(this.storage_uint8_[0])),2)<<0|0)>>>0}}),Object.defineProperty(y.prototype,"offset",{get:function(){return c(this.storage_uint8_.byteOffset)}}),Object.defineProperty(y.prototype,"buffer",{get:function(){return this.storage_uint8_.buffer.slice(this.storage_uint8_.byteOffset,i(this.storage_uint8_.byteOffset,4))}}),Object.defineProperty(y.prototype,"set",{get:function(){return function(t){t instanceof y?(this.storage_uint8_[3]=a(t.r),this.storage_uint8_[2]=a(t.g),this.storage_uint8_[1]=a(t.b),this.storage_uint8_[0]=a(t.a)):"subarray"in t?(this.storage_uint8_[3]=a(t[3]),this.storage_uint8_[2]=a(t[2]),this.storage_uint8_[1]=a(t[1]),this.storage_uint8_[0]=a(t[0])):"slice"in t?this.storage_uint8_.set(t.slice(0,4)):this.storage_uint8_.set(t)}}}),Object.defineProperty(y.prototype,"subarray",{get:function(){return function(t,e){return this.storage_uint8_.subarray(t,e)}}}),Object.defineProperty(y.prototype,"slice",{get:function(){return function(t,e){return this.storage_uint8_.slice(t,e)}}}),y.prototype.is_fully_transparent=function(){return(0|this.a)>>>0==(0|0)>>>0},y.prototype.simplify=function(t){var e=Uint8ClampedArray.of(u(r(this.a/t),t),u(r(this.b/t),t),u(r(this.g/t),t),u(r(this.r/t),t));return this.set(e),this},y.prototype.blend_with=function(t,e,r,n){if(n|=0,t.multiply_a_1000(0|e),r){if(this.is_fully_transparent())return t.set(this),this;if(t.is_fully_transparent())return this.set(t),this}var _=(0|n)>0?h(i(this.a,t.a),2):p(f(u(p(t.a),p(this.a))));return this.set(y.merge_scale_of_255_a_fixed(t,h(u(t.a,255),_),this,f(u(this.a,h(u(p(t.a),255),_))),_)),t.set(this),this},y.prototype.euclidean_match_with=function(t,e){return 1e3==(0|(e=(0|e)>>>0))||(0==(0|e)?(0|this.uint32)==(0|t.uint32):(Math.sqrt(n*Math.pow(this.r-t.r|0,2)+_*Math.pow(this.g-t.g|0,2)+o*Math.pow(this.b-t.b|0,2)+1*Math.pow(this.a-t.a|0,2))/s*1e3|0)<(0|e))},y.prototype.manhattan_match_with=function(t,e){return 1e3==(0|(e=(0|e)>>>0))||(0==(0|e)?(0|this.uint32)==(0|t.uint32):((n*g(this.r-t.r|0)+_*g(this.g-t.g|0)+o*g(this.b-t.b|0)+1*g(this.a-t.a|0)|0)/510*1e3|0)<(0|e))},y.prototype.multiply_a_1000=function(t){var e=this.subarray();return e[0]=a(h(u(e[0],t),1e3)),this},y.prototype.copy=function(){return y(this.slice(0,4))},y.with_a=function(t,e){var r=t.slice(0,4);return r[0]=a(e),y(r)},y.merge_scale_of_255_a_fixed=function(t,e,r,n,_){return e=a(e),n=a(n),_=a(_),y.merge_with_a_fixed(y.scale_rgb_of_on_255(t,e,e,e),y.scale_rgb_of_on_255(r,n,n,n),_)},y.scale_rgb_of_on_255=function(t,e,r,n){return y(Uint8ClampedArray.of(0,f(u(t.b,n)),f(u(t.g,r)),f(u(t.r,e))))},y.merge_with_a_fixed=function(t,e,r){return y(Uint8ClampedArray.of(a(r),i(t.b,e.b),i(t.g,e.g),i(t.r,e.r)))};var b=function(t,e,r){if(!(this instanceof b))return new b(t);this.storage_="buffer"in t?t.buffer:t,e|=0,r=0|r||0|this.storage_.byteLength,this.storage_uint8_array_=new Uint8Array(this.storage_,e,r),this.storage_uint32_array_=new Uint32Array(this.storage_,e,c(r))};Object.defineProperty(b.prototype,"length",{get:function(){return this.storage_uint32_array_.length}}),Object.defineProperty(b.prototype,"buffer",{get:function(){return this.storage_uint8_array_.buffer}}),Object.defineProperty(b.prototype,"buffer_setUint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_[t]=a(e)}}}),Object.defineProperty(b.prototype,"buffer_getUint8",{get:function(){return function(t){return t|=0,this.storage_uint8_array_[t]}}}),Object.defineProperty(b.prototype,"buffer_getUint8a",{get:function(){return function(t,e){return e=i(t|=0,l(e=(e|=0)||1)),this.storage_uint8_array_.subarray(t,e)}}}),Object.defineProperty(b.prototype,"buffer_setUint32",{get:function(){return function(t,e){this.storage_uint32_array_[0|t]=function(t){return(0|t)>>>0&4294967295}(e)}}}),Object.defineProperty(b.prototype,"buffer_getUint32",{get:function(){return function(t){return this.storage_uint32_array_[0|t]}}}),Object.defineProperty(b.prototype,"subarray_uint32",{get:function(){return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.subarray(t,e)}}}),Object.defineProperty(b.prototype,"slice_uint32",{get:function(){return function(t,e){return t|=0,e=(e|=0)||this.length,this.storage_uint32_array_.slice(t,e)}}}),Object.defineProperty(b.prototype,"subarray_uint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.subarray(l(t),l(e))}}}),Object.defineProperty(b.prototype,"slice_uint8",{get:function(){return function(t,e){return t|=0,e|=0,this.storage_uint8_array_.slice(l(t),l(e))}}}),b.prototype.get_element=function(t){return y(this.buffer,0|t)},b.prototype.subarray=function(t,e){return t|=0,e|=0,this.buffer_getUint8a(t,e)};var d=function(t){if(t=t||{},!(this instanceof d))return new d(t);t.pxl_colors=t.pxl_colors||new Uint32Array(0),t.pxls=t.pxls||new Uint32Array(0),this.bucket_threshold_auto_goal_target_=1,this.is_bucket_threshold_auto_=Boolean(4294967295===t.bucket_threshold),this.this_state_bucket_threshold_=t.this_state_bucket_threshold||0,t.bucket_threshold=t.bucket_threshold||0,t.bucket_threshold=(0|t.bucket_threshold)>=1?0|t.bucket_threshold:0|this.this_state_bucket_threshold_,this.bucket_threshold_=0|(this.is_bucket_threshold_auto_?this.bucket_threshold_auto_goal_target_:t.bucket_threshold),this.threshold_steps_=t.threshold_steps||(this.is_bucket_threshold_auto_?1:8),this.color_number_bonus_=0|t.color_number_bonus,this.best_color_number_=(t.best_color_number||t.pxl_colors.length/2)+this.color_number_bonus_|0,this.new_pxls_="buffer"in t.pxls?new Uint32Array(t.pxls.buffer):Uint32Array.from(t.pxls),this.new_pxl_colors_="buffer"in t.pxl_colors?b(t.pxl_colors.buffer):b(Uint32Array.from(t.pxl_colors)),this.max_cluster_length_=0,this.max_cluster_=0,this.index_clusters_=new Array(4097),this.length_clusters_=new Uint32Array(4097),this.pxl_colors_usage_=new Uint32Array(this.new_pxl_colors_.length),this.all_index_clusters_=new Uint32Array(this.new_pxl_colors_.length),this.clean_pxl_colors_=new Uint32Array(this.new_pxl_colors_.length),this.clean_pxl_colors_lookup_=new Map};Object.defineProperty(d.prototype,"reset_deduplicate",{get:function(){return function(t){this.pxl_colors_usage_.fill(0,0,0|t),this.clean_pxl_colors_lookup_.clear(),t===this.clean_pxl_colors_.length?this.clean_pxl_colors_.fill(0):this.clean_pxl_colors_=new Uint32Array(0|t)}}}),Object.defineProperty(d.prototype,"index_of_color_within_cleaned",{get:function(){return function(t){return 0|(this.clean_pxl_colors_lookup_.get((0|t)>>>0)||-1)}}}),Object.defineProperty(d.prototype,"set_cleaned_pxl_colors",{get:function(){return function(t,e){this.clean_pxl_colors_[(0|t)>>>0]=(0|e)>>>0,this.clean_pxl_colors_lookup_.set((0|e)>>>0,(0|t)>>>0)}}}),Object.defineProperty(d.prototype,"increase_color_usage",{get:function(){return function(t){this.pxl_colors_usage_[(0|t)>>>0]=(this.pxl_colors_usage_[(0|t)>>>0]+1|0)>>>0}}}),Object.defineProperty(d.prototype,"set_new_pxls",{get:function(){return function(t,e){this.new_pxls_[(0|t)>>>0]=(0|e)>>>0}}}),Object.defineProperty(d.prototype,"set_new_pxl_colors",{get:function(){return function(t){this.new_pxl_colors_=b(this.clean_pxl_colors_.buffer.slice(0,l(0|t)))}}}),Object.defineProperty(d.prototype,"get_a_new_pxl_color_from_pxl_index",{get:function(){return function(t){return 4294967295&this.new_pxl_colors_.buffer_getUint32(this.new_pxls_[0|t])}}}),Object.defineProperty(d.prototype,"reset_cluster",{get:function(){return function(){this.max_cluster_=this.new_pxl_colors_.length>16384?4097:this.new_pxl_colors_.length>4096?257:this.new_pxl_colors_.length>256?17:1,this.length_clusters_.fill(0,0,0|this.max_cluster);for(var t=0;(0|t)<(0|this.max_cluster);t=(t+1|0)>>>0)this.index_clusters_[0|t]=[]}}}),Object.defineProperty(d.prototype,"add_in_indexes_cluster",{get:function(){return function(t,e){this.index_clusters_[(0|t)>>>0].push((0|e)>>>0)}}}),Object.defineProperty(d.prototype,"set_all_cluster_indexes",{get:function(){return function(){var t=0,e=0;for(t=0;(0|t)<(0|this.max_cluster);t=(t+1|0)>>>0)this.all_index_clusters_.set(this.index_clusters_[(0|t)>>>0],(0|e)>>>0),e=(e+this.get_length_in_index_clusters(0|t)|0)>>>0}}}),Object.defineProperty(d.prototype,"get_length_in_index_clusters",{get:function(){return function(t){return(0|this.index_clusters_[(0|t)>>>0].length)>>>0}}}),Object.defineProperty(d.prototype,"get_in_cluster_lengths",{get:function(){return function(t){return(0|this.length_clusters_[(0|t)>>>0])>>>0}}}),Object.defineProperty(d.prototype,"get_an_index_in_clusters",{get:function(){return function(t){return(0|this.all_index_clusters_[0|t])>>>0}}}),Object.defineProperty(d.prototype,"get_a_color_usage",{get:function(){return function(t){return(0|this.pxl_colors_usage_[0|t])>>>0}}}),Object.defineProperty(d.prototype,"get_a_color_usage_percent",{get:function(){return function(t){return e(this.pxl_colors_usage_[0|t]/this.new_pxls_.length)}}}),Object.defineProperty(d.prototype,"get_average_color_usage_percent",{get:function(){return function(t,r){var n=0,_=0,o=0;for(_=t;(0|_)<(0|r);_=(_+1|0)>>>0)o=(0|this.get_an_index_in_clusters((0|_)>>>0))>>>0,n+=this.pxl_colors_usage_[0|o]/this.new_pxls_.length;return e(n/(r-t|0))}}}),Object.defineProperty(d.prototype,"get_a_new_pxl_color",{get:function(){return function(t){return this.new_pxl_colors_.get_element(0|t)}}}),Object.defineProperty(d.prototype,"max_cluster",{get:function(){return 0|this.max_cluster_}}),Object.defineProperty(d.prototype,"threshold_steps",{get:function(){return 0|this.threshold_steps_}}),Object.defineProperty(d.prototype,"new_pxls_length",{get:function(){return 0|this.new_pxls_.length}}),Object.defineProperty(d.prototype,"new_pxl_colors_length",{get:function(){return 0|this.new_pxl_colors_.length}}),Object.defineProperty(d.prototype,"best_color_number",{get:function(){return 0|this.best_color_number_}}),Object.defineProperty(d.prototype,"bucket_threshold",{get:function(){return 0|this.bucket_threshold_}}),Object.defineProperty(d.prototype,"is_bucket_threshold_auto",{get:function(){return 0|this.is_bucket_threshold_auto_}}),Object.defineProperty(d.prototype,"set_bucket_threshold",{get:function(){return function(t){this.bucket_threshold_=0|t}}}),Object.defineProperty(d.prototype,"get_data",{get:function(){return function(){var t=new Uint32Array(2+this.new_pxls_.length+this.new_pxl_colors_.length);return t[0]=4294967295&(0|this.new_pxls_.length),t[1]=4294967295&(0|this.new_pxl_colors_.length),t.set(this.new_pxls_,2),t.set(this.new_pxl_colors_.slice_uint32(0,this.new_pxl_colors_.length),2+this.new_pxls_.length),t.buffer}}}),d.prototype.deduplicate=function(){this.reset_deduplicate(0|this.new_pxl_colors_length);for(var t=0,e=0,r=0,n=0;(0|n)<(0|this.new_pxls_length);n=(n+1|0)>>>0)e=0|this.get_a_new_pxl_color_from_pxl_index(0|n),-1==(0|(r=0|this.index_of_color_within_cleaned(0|e)))&&(this.set_cleaned_pxl_colors(0|t,0|e),r=0|t,t=t+1|0),this.increase_color_usage(0|r),this.set_new_pxls(0|n,0|r);this.set_new_pxl_colors(t)},d.prototype.clusterize=function(){this.reset_cluster();var t=0;if(4097===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|t)>>>0).rgbaon12bits)>>>0,(0|t)>>>0);else if(257===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|t)>>>0).rgbaon8bits)>>>0,(0|t)>>>0);else if(17===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster((0|this.get_a_new_pxl_color((0|t)>>>0).rgbaon4bits)>>>0,(0|t)>>>0);else if(1===this.max_cluster)for(;(0|t)<(0|this.new_pxl_colors_length);t=(t+1|0)>>>0)this.add_in_indexes_cluster(0,(0|t)>>>0);this.set_all_cluster_indexes()},d.prototype.process_threshold=function(t){t=(0|t)>>>0;for(var e,r,n=this.bucket_threshold*(t/this.threshold_steps)|0,_=Math.fround(t/this.threshold_steps),o=new Set,s=new Set,i=0,u=0,l=0,h=0,c=!1,a=0,p=0,f=0,g=0,y=0,b=0,d=0,x=0,w=0,O=0,P=0,j=0;(0|j)<(0|this.max_cluster);j=(j+1|0)>>>0){for(u=(i+(0|this.get_length_in_index_clusters(0|j))|0)>>>0,d=i;(0|d)<(0|u);d=(d+1|0)>>>0)if(g=this.get_average_color_usage_percent(0|i,0|u),y=(0|this.get_an_index_in_clusters((0|d)>>>0))>>>0,s.clear(),!o.has(0|y)){for(e=this.get_a_new_pxl_color((0|y)>>>0),l=(0|this.get_a_color_usage((0|y)>>>0))>>>0,P=6*g*4*this.get_a_color_usage_percent((0|y)>>>0)/10,0,x=(0|d)>>>0;(0|x)<(0|u);x=(x+1|0)>>>0)b=(0|this.get_an_index_in_clusters((0|x)>>>0))>>>0,o.has(0|b)||(r=this.get_a_new_pxl_color((0|b)>>>0),f=((n/1e3+n/1e3*(1-(p=0|((0|(p=(a=1e3*((c=(0|l)>(0|(h=(0|this.get_a_color_usage((0|b)>>>0))>>>0)))?l/h:h/l)|0)+(a>=500?-a:+a)/(1e3/Math.abs(a-500|0))|0))<1?1:(0|p)>999?999:p))/1e3)*_)/(1+_)*1e3|0)>>>0,e.euclidean_match_with(r,(6*f+4*f*P)/10|0)&&(o.add(b),s.add(r),c?e.blend_with(r,a,!1,!1):r.blend_with(e,a,!1,!1)));for(O=s.values(),w=0;(0|w)<(0|s.size);w=(w+1|0)>>>0)O.next().value.set(e);o.add(y)}i=0|u}return o.size>0},d.prototype.round=function(){if(this.new_pxl_colors_length>4096)for(var t=this.new_pxl_colors_.length>32768?9.6:this.new_pxl_colors_.length>16384?4.8:this.new_pxl_colors_.length>8192?3.2:this.new_pxl_colors_.length>4096?1.6:1,e=0;(0|e)<(0|this.new_pxl_colors_length);e=(e+1|0)>>>0)this.get_a_new_pxl_color((0|e)>>>0).simplify(0|t)},d.prototype.init=function(){return this.round(),this},d.prototype.run=function(){for(var t=!1,e=!0;!t;){for(var r=1;(0|r)<=(0|this.threshold_steps);r=(r+1|0)>>>0)e&&(this.deduplicate(),this.clusterize()),e=this.process_threshold(0|r);this.new_pxl_colors_length<this.best_color_number||!this.is_bucket_threshold_auto?t=!0:this.new_pxl_colors_length>this.best_color_number&&this.set_bucket_threshold(this.bucket_threshold+4|0)}return this.get_data()};var x=new Uint32Array(t),w=x[0],O=x[1],P=x[2],j=x[3],m=x[4],k=x[5],U=x[6],v=x.slice(6,6+w),A=x.slice(6+w,6+w+O);return new Promise((function(t){t(d({pxls:v,pxl_colors:A,bucket_threshold:P,threshold_steps:j,color_number_bonus:m,best_color_number:k,this_state_bucket_threshold:U}).init().run())}))};`
            + "return t;";

        return new AFunction(asyncs)();
    },

    from: function(pool, pxls, pxl_colors, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold){

        let cs = this._create_state;
        let f = this._create_func();
        let s = cs(
            pool,
            Uint32Array.from(pxls),
            Uint32Array.from(pxl_colors),
            bucket_threshold,
            threshold_steps,
            color_number_bonus,
            best_color_number,
            state_bucket_threshold
        );

        return {
            // Methods
            new(pool, pxls, pxl_colors, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold) {
                "use strict";
                s = cs(pool, pxls, pxl_colors, bucket_threshold, threshold_steps, color_number_bonus, best_color_number, state_bucket_threshold);
            },
            destroy(callback_function = function(){}) {
                if(s !== null) {
                    s.workerp.terminate(callback_function);
                    s = null;
                }else {
                    callback_function("ok");
                }
            },
            compute(callback_function) {
                "use strict";
                if(s !== null) {

                    var array_buffer = new Uint32Array(6+s.p.length+s.pc.length);
                        array_buffer[0] = (s.p.length | 0) & 0xFFFFFFFF;
                        array_buffer[1] = (s.pc.length | 0) & 0xFFFFFFFF;
                        array_buffer[2] = s.bt === "auto" ? 0xFFFFFFFF: (s.bt * 1000 | 0) & 0xFFFFFFFF;
                        array_buffer[3] = (s.ts | 0) & 0xFFFFFFFF;
                        array_buffer[4] = (s.cnb | 0) & 0xFFFFFFFF;
                        array_buffer[5] = (s.bcn | 0) & 0xFFFFFFFF;
                        array_buffer[6] = (s.stb | 0) & 0xFFFFFFFF;
                        array_buffer.set(s.p, 6);
                        array_buffer.set(s.pc, 6+s.p.length|0);

                    s.workerp.exec(

                        f, [array_buffer.buffer]
                    ).catch((e) => {

                        return f(array_buffer.buffer);
                    }).timeout(120 * 1000).then(function(buffer){

                        var array_buffer = new Uint32Array(buffer);
                        var pl = array_buffer[0];
                        var pcl = array_buffer[1];
                        var results = new Array(2);
                            results[0] = Uint16Array.from(array_buffer.subarray(2, pl+2|0));
                            results[1] = array_buffer.slice(2+pl|0, 2+pl+pcl|0);

                        callback_function(results);
                    });

                }else {

                    callback_function([]);
                }
            },
        };
    }
};

module.exports = ReducePalette;