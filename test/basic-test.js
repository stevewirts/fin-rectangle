/* globals describe, it, assert */

'use strict';

var rectangles = document.querySelector('fin-rectangle');

describe('<fin-rectangle>', function() {

    describe('Point api', function() {
        it('should have a constructor that sets x and y', function() {
            var p1 = rectangles.point.create(3, 4);
            var p2 = rectangles.point.create(3, 4);
            assert.equal(p1.x, p2.x);
            assert.equal(p1.y, p2.y);
        });
        it('has state that cannot be mutated', function() {
            var p1 = rectangles.point.create(3, 4);
            var isImmutable = false;
            try {
                p1.x = 0;
                p1.y = 0;
            } catch (e) {
                isImmutable = true;
            }
            assert.equal(isImmutable, true);
        });
        it('should have a plus function that adds another point', function() {
            var p1 = rectangles.point.create(3, 4);
            var p2 = rectangles.point.create(3, 4);
            var p3 = p1.plus(p2);
            assert.equal(p3.x, 6);
            assert.equal(p3.y, 8);
        });
        it('should have a minus function that subtracts another point', function() {
            var p1 = rectangles.point.create(3, 4);
            var p2 = rectangles.point.create(3, 4);
            var p3 = p1.minus(p2);
            assert.equal(p3.x, 0);
            assert.equal(p3.y, 0);
        });
        it('should have a min function that returns a point this is min of both x and y', function() {
            var p1 = rectangles.point.create(0, 10);
            var p2 = rectangles.point.create(10, 0);
            var p3 = p1.min(p2);
            assert.equal(p3.x, 0);
            assert.equal(p3.y, 0);
        });
        it('should have a max function that returns a point this is max of both x and y', function() {
            var p1 = rectangles.point.create(0, 10);
            var p2 = rectangles.point.create(10, 0);
            var p3 = p1.max(p2);
            assert.equal(p3.x, 10);
            assert.equal(p3.y, 10);
        });
        it('should have a distance function that returns the distance between itself and another point via Pythagorean Theorem', function() {
            var p1 = rectangles.point.create(1, 5);
            var p2 = rectangles.point.create(-2, 1);
            assert.equal(p1.distance(p2), 5);
        });
        it('should have a greaterThan function that returns true if the argument has both larger x and y', function() {
            var p0 = rectangles.point.create(0, 0);
            var p1 = rectangles.point.create(-10, 10);
            var p2 = rectangles.point.create(10, -10);
            var p3 = rectangles.point.create(-10, -10);
            assert.equal(p0.greaterThan(p0), false);
            assert.equal(p0.greaterThan(p1), false);
            assert.equal(p0.greaterThan(p2), false);
            assert.equal(p0.greaterThan(p3), true);
        });
        it('should have a greaterThanEqualTo function that returns true if the argument has both larger and equal to x and y', function() {
            var p0 = rectangles.point.create(0, 0);
            var p1 = rectangles.point.create(0, 10);
            var p2 = rectangles.point.create(10, 0);
            var p3 = rectangles.point.create(-10, -10);
            assert.equal(p0.greaterThanEqualTo(p0), true);
            assert.equal(p0.greaterThanEqualTo(p1), false);
            assert.equal(p0.greaterThanEqualTo(p2), false);
            assert.equal(p0.greaterThanEqualTo(p3), true);
        });
        it('should have a lessThan function that returns true if the argument has both smaller x and y', function() {
            var p0 = rectangles.point.create(0, 0);
            var p1 = rectangles.point.create(-10, 10);
            var p2 = rectangles.point.create(10, -10);
            var p3 = rectangles.point.create(10, 10);

            assert.equal(p0.lessThan(p0), false);
            assert.equal(p0.lessThan(p1), false);
            assert.equal(p0.lessThan(p2), false);
            assert.equal(p0.lessThan(p3), true);
        });
        it('should have a lessThanEqualTo function that returns true if the argument has both smaller and equal to x and y', function() {
            var p0 = rectangles.point.create(0, 0);
            var p1 = rectangles.point.create(0, -10);
            var p2 = rectangles.point.create(-10, 0);
            var p3 = rectangles.point.create(10, 10);

            assert.equal(p0.lessThanEqualTo(p0), true);
            assert.equal(p0.lessThanEqualTo(p1), false);
            assert.equal(p0.lessThanEqualTo(p2), false);
            assert.equal(p0.lessThanEqualTo(p3), true);
        });
        it('should have a isContainedWithinRectangle function that returns true if this is inside the rectangle argument', function() {
            var p0 = rectangles.point.create(1, 1);
            var r1 = rectangles.rectangle.create(0, 0, 10, 10);
            var r2 = rectangles.rectangle.create(2, 2, 10, 10);

            assert.equal(p0.isContainedWithinRectangle(r1), true);
            assert.equal(p0.isContainedWithinRectangle(r2), false);
        });
    });

    describe('Rectangle api', function() {
        it('should have a constructor that sets origin and extent', function() {
            var r1 = rectangles.rectangle.create(0, 0, 3, 4);
            var r2 = rectangles.rectangle.create(0, 0, 3, 4);
            assert.equal(r1.origin.x, r2.origin.x);
            assert.equal(r1.origin.y, r2.origin.y);
            assert.equal(r1.extent.x, r2.extent.x);
            assert.equal(r1.extent.y, r2.extent.y);
        });
        it('has state that cannot be mutated', function() {
            var r1 = rectangles.rectangle.create(0, 0, 3, 4);
            var isImmutable = false;
            try {
                r1.extent = rectangles.point.create(10, 10);
                r1.origin = rectangles.point.create(10, 10);
            } catch (e) {
                isImmutable = true;
            }
            assert.equal(isImmutable, true);
        });
    });

});
