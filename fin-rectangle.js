'use strict';

(function() {

    function rectangleContains(rect, x, y) {
        var minX = rect.origin.x;
        var minY = rect.origin.y;
        var maxX = minX + rect.extent.x;
        var maxY = minY + rect.extent.y;

        if (rect.extent.x < 0) {
            minX = maxX;
            maxX = rect.origin.x;
        }

        if (rect.extent.y < 0) {
            minY = maxY;
            maxY = rect.origin.y;
        }

        var result =
            x >= minX &&
            y >= minY &&
            x <= maxX &&
            y <= maxY;

        return result;
    }

    function createPoint(x, y) {

        var that = {};

        /**
         * The x of this point expressed as a number,
         *
         * @attribute point.x
         * @type number
         * @default '0'
         */
        Object.defineProperty(that, 'x', {
            value: x || 0,
            writable: false,
            enumerable: true,
            configurable: false
        });


        /**
         * The y of this point expressed as a number,
         *
         * @attribute point.y
         * @type number
         * @default '0'
         */
        Object.defineProperty(that, 'y', {
            value: y || 0,
            writable: false,
            enumerable: true,
            configurable: false
        });

        that.plus = function(point) {
            var result = createPoint(this.x + point.x, y + point.y);
            return result;
        };

        that.minus = function(point) {
            var result = createPoint(x - point.x, y - point.y);
            return result;
        };
        that.min = function(point) {
            var result = createPoint(Math.min(x, point.x), Math.min(y, point.y));
            return result;
        };
        that.max = function(point) {
            var result = createPoint(Math.max(x, point.x), Math.max(y, point.y));
            return result;
        };
        that.distance = function(point) {
            var dx = point.x - x,
                dy = point.y - y,
                result = Math.sqrt((dx * dx) + (dy * dy));
            return result;
        };
        that.greaterThan = function(point) {
            var result = this.x > point.x && y > point.y;
            return result;
        };
        that.lessThan = function(point) {
            var result = this.x < point.x && y < point.y;
            return result;
        };
        that.greaterThanEqualTo = function(point) {
            var result = this.x >= point.x && y >= point.y;
            return result;
        };
        that.lessThanEqualTo = function(point) {
            var result = this.x <= point.x && y <= point.y;
            return result;
        };
        that.isContainedWithinRectangle = function(rect) {
            return rectangleContains(rect, this.x, this.y);
        };
        return that;
    }

    function createRectangle(x, y, width, height) {

        var that = {};

        /**
         * The origin of this rectangle expressed as a point object,
         *
         * @attribute rectangle.origin
         * @type point
         * @default 'point at 0,0'
         */
        var origin = createPoint(x, y);

        /**
         * The extent of this rectangle expressed as a point object,
         *
         * @attribute rectangle.extent
         * @type point
         * @default 'point at 0,0'
         */
        var extent = createPoint(width, height);

        /**
         * The corner of this rectangle expressed as a point object,
         *
         * @attribute rectangle.corner
         * @type point
         * @default 'point at 0,0'
         */
        var corner = createPoint(x + width, y + height);

        /**
         * The center of this rectangle expressed as a point object,
         *
         * @attribute rectangle.center
         * @type point
         * @default 'point at 0,0'
         */
        var center = createPoint(x + (width / 2), y + (height / 2));

        Object.defineProperty(that, 'origin', {
            value: origin,
            writable: false,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(that, 'extent', {
            value: extent,
            writable: false,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(that, 'corner', {
            value: corner,
            writable: false,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(that, 'center', {
            value: center,
            writable: false,
            enumerable: true,
            configurable: false
        });

        that.top = function() {
            return this.origin.y;
        };

        that.left = function() {
            return this.origin.x;
        };

        that.bottom = function() {
            return this.top() + this.extent.y;
        };

        that.right = function() {
            return this.left() + this.extent.x;
        };

        that.width = function() {
            return this.extent.x;
        };

        that.height = function() {
            return this.extent.y;
        };

        that.area = function() {
            return this.extent.x * this.extent.y;
        };

        that.flattenXAt = function(x) {
            var o = this.origin;
            var e = this.extent;
            return createRectangle(x, o.y, 0, e.y);
        };

        that.flattenYAt = function(y) {
            var o = this.origin;
            var e = this.extent;
            return createRectangle(o.x, y, e.x, 0);
        };

        that.contains = function(pointOrRect) {
            var result = pointOrRect.isContainedWithinRectangle(this);
            return result;
        };

        that.isContainedWithinRectangle = function(rect) {
            var result = rect.origin.lessThanEqualTo(this.origin) && rect.corner.greaterThanEqualTo(this.corner);
            return result;
        };

        that.insetBy = function(thickness) {
            var result = createRectangle(
                this.origin.x + thickness,
                this.origin.y + thickness,
                this.extent.x - 2 * thickness,
                this.extent.y - 2 * thickness);
            return result;
        };

        that.union = function(rectangle) {
            //answer a rectangle that contains the receiver and argment rectangles
            var anOrigin = this.origin.min(rectangle.origin),
                aCorner = this.corner.max(rectangle.corner),
                width = aCorner.x - anOrigin.x,
                height = aCorner.y - anOrigin.y,
                result = createRectangle(anOrigin.x, anOrigin.y, width, height);

            return result;
        };

        that.forEach = function(func) {
            var xstart = this.origin.x;
            var xstop = this.origin.x + this.extent.x;
            var ystart = this.origin.y;
            var ystop = this.origin.y + this.extent.y;
            for (var x = xstart; x < xstop; x++) {
                for (var y = ystart; y < ystop; y++) {
                    func(x, y);
                }
            }
        };

        that.intersect = function(rectangle, ifNoneAction) {
            //Answer a Rectangle that is the area in which the receiver overlaps with
            //rectangle. Optimized for speed
            var point = rectangle.origin,
                myCorner = this.corner,
                left = null,
                right = null,
                top = null,
                bottom = null,
                result = null;

            if (ifNoneAction && !this.intersects(rectangle)) {
                return ifNoneAction.call(this, rectangle);
            }

            if (point.x > this.origin.x) {
                left = point.x;
            } else {
                left = this.origin.x;
            }

            if (point.y > this.origin.y) {
                top = point.y;
            } else {
                top = this.origin.y;
            }

            point = rectangle.corner;
            if (point.x < myCorner.x) {
                right = point.x;
            } else {
                right = myCorner.x;
            }

            if (point.y < myCorner.y) {
                bottom = point.y;
            } else {
                bottom = myCorner.y;
            }
            result = createRectangle(left, top, right - left, bottom - top);
            return result;
        };

        that.intersects = function(rectangle) {
            //return true if we overlap, false otherwise

            var rOrigin = rectangle.origin,
                rCorner = rectangle.corner;

            if (rCorner.x <= this.origin.x) {
                return false;
            }
            if (rCorner.y <= this.origin.y) {
                return false;
            }
            if (rOrigin.x >= this.corner.x) {
                return false;
            }
            if (rOrigin.y >= this.corner.y) {
                return false;
            }
            return true;
        };

        return that;
    }

    /**
     *
     * returns an instance of point.
     *
     * @method point.create(x, y)
     * @param {Number} the x coordinate
     *    @param {Number} the y coordinate.
     * @returns {rectangle.point} point object.
     */

    /**
     *
     * returns an instance of rectangle.
     *
     * @method rectangle.create(ox,oy,ex,ey)
     * @param {Number} the x origin coordinate
     *    @param {Number} the y origin coordinate.
     *    @param {Number} the width extent.
     *    @param {Number} the height extent.
     * @returns {rectangle.rectangle} rectangle object.
     */

    Polymer('fin-rectangle', { /* jshint ignore:line  */
        point: {
            create: createPoint
        },
        rectangle: {
            create: createRectangle,
            contains: rectangleContains
        }
    });

})();
