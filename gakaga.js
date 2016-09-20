    var Player = {
            x: 0,
            y: 0,
            facing: 1,
            health: 90,
            img: {}
        },
        Bullet = {
            x: 0,
            y: 0,
            facing: 1,
            speed: 10
        },
        BadGuy = {
            x: 0,
            y: 0,
            facing: 0,
            health: 90,
            img: {}
        },
        Game = function() {
            return this.Surface = {}, this.backBuffer = {}, this.dims = {
                width: 0,
                height: 0
            }, this.playerSprite = Player, this.bulletSprite = new Image, this.bulletSprite.src = 'Content/bullet.png', this.enemies = [], this.bullets = [], this.score = 0, this.gamerunning = !0, this.goodending = !1, this.keyboard = {
                up: !1,
                down: !1,
                right: !1,
                left: !1,
                f: !1,
                rframe: !1
            }, this.sky = {
                x: 0,
                y: 0,
                velocity: 5,
                img: null
            }, this.sky.img = new Image, this.sky.img.src = 'Content/sky.jpg', this.playerSprite.x = 200, this.playerSprite.y = 190, this.playerSprite.facing = 1, this.playerSprite.health = 90, this.playerSprite.imgL = new Image, this.playerSprite.imgL.src = 'Content/ship.l.png', this.playerSprite.imgR = new Image, this.playerSprite.imgR.src = 'Content/ship.blowsup.png', this
        };
    Game.prototype.initScreen = function(t) {
        var e = t;
        e.getContext && (this.Surface = e.getContext("2d"), this.Surface.fillStyle = "rgb(0,0,0)");
        var i = document.createElement("canvas");
        i.width = e.width, i.height = e.height, this.backBuffer = i.getContext("2d"), this.backBuffer.fillStyle = "rgb(0,0,0)", this.dims.width = i.width, this.dims.height = i.height;
        var n = this;
        return document.addEventListener("keydown", function(t) {
            n.captureKeys(t, n)
        }, !1), document.addEventListener("keyup", function(t) {
            n.uncaptureKeys(t, n)
        }, !1), this
    };
    Game.prototype.fire = function() {
        var t = this;
        window.requestAnimationFrame(function() {
            t.updateFrame(), t.renderFrame(), t.fire()
        });
    }, Game.prototype.updateFrame = function() {
        if (this.keyboard.up && (this.playerSprite.y -= 5), this.keyboard.down && (this.playerSprite.y += 5), this.keyboard.left && (this.playerSprite.x -= 5), this.keyboard.right && (this.playerSprite.x += 5), this.keyboard.f) {
            this.keyboard.f = !1;
            var t = {
                x: this.playerSprite.x + 12,
                y: this.playerSprite.y,
                facing: 1,
                speed: 10
            };
            this.bullets.push(t)
        }
        if (this.playerSprite.y < 0 && (this.playerSprite.y = 0), this.playerSprite.x < 0 && (this.playerSprite.x = 0), 0 == this.enemies.length)
            for (var e = 0; 10 > e; e++) {
                var t = {
                    y: 0 - Math.floor(500 * Math.random() + 1),
                    x: Math.floor(Math.random() * this.dims.width - 100 + 50) + 50,
                    facing: 0,
                    health: Math.floor(3 * Math.random() + 1),
                    img: {}
                };
                t.img = new Image, t.img.src = 'Content/badguy.png', t.blowsup = new Image, t.blowsup.src = 'Content/badguy.blowsup.png', this.enemies.push(t)
            }
    };
    Game.prototype.renderFrame = function() {
        if (this.backBuffer.clearRect(0, 0, this.dims.width, this.dims.height), this.backBuffer.drawImage(this.sky.img, this.sky.x, this.sky.y), this.playerSprite.health > 0 ? this.backBuffer.drawImage(this.playerSprite.imgL, this.playerSprite.x, this.playerSprite.y) : (this.backBuffer.drawImage(this.playerSprite.imgR, this.playerSprite.x, this.playerSprite.y), this.gamerunning = !1), this.gamerunning) {
            for (var e = this.bullets.length - 1; e >= 0; e--) this.backBuffer.drawImage(this.bulletSprite, this.bullets[e].x, this.bullets[e].y), this.bullets[e].y -= this.bullets[e].speed, this.bullets[e].y > this.dims.height && this.bullets.splice(e, 1);
            for (var e = this.enemies.length - 1; e >= 0; e--) {
                for (var t = this.bullets.length - 1; t >= 0; t--) this.bullets[t].y <= this.enemies[e].y && this.bullets[t].x >= this.enemies[e].x && this.bullets[t].x <= this.enemies[e].x + 30 && (this.enemies[e].health--, this.bullets.splice(t, 1));
                this.enemies[e].x < this.playerSprite.x + 26 && this.enemies[e].x + 26 > this.playerSprite.x && this.enemies[e].y < this.playerSprite.y + 28 && 20 + this.enemies[e].y > this.playerSprite.y && (this.enemies[e].health = 0, this.playerSprite.health -= 25), this.enemies[e].health <= 0 ? this.backBuffer.drawImage(this.enemies[e].blowsup, this.enemies[e].x, this.enemies[e].y) : this.backBuffer.drawImage(this.enemies[e].img, this.enemies[e].x, this.enemies[e].y), this.enemies[e].y += 1, this.enemies[e].y > 240 ? (this.enemies.splice(e, 1), this.score -= 10) : this.enemies[e].health <= 0 && (this.enemies.splice(e, 1), this.score += 50)
            }
        } else this.backBuffer.fillStyle = "#FFF", 1 == this.goodending ? (this.backBuffer.font = "26px Georgia", this.backBuffer.fillText("YOU SAVE EARTH!", 30, 110), this.backBuffer.fillText("AND ALL YOU GOT WAS THIS", 30, 135), this.backBuffer.fillText("LOUSY END-GAME SCREEN!", 30, 160)) : (this.backBuffer.font = "26px Georgia", this.backBuffer.fillText("GAME OVER", 125, 120));
        this.backBuffer.fillStyle = "#FFF", this.backBuffer.font = "12px Georgia", this.backBuffer.fillText("Score: " + this.score, 10, 10), this.backBuffer.fillText("Life: " + this.playerSprite.health, 10, 25), this.Surface.clearRect(0, 0, this.dims.width, this.dims.height), this.Surface.drawImage(this.backBuffer.canvas, 0, 0), this.score >= 5e3 && (this.gamerunning = !1, this.goodending = !0)
    }, Game.prototype.captureKeys = function(e, t) {
        "undefined" == typeof e && (e = window.event);
        var i = function(e) {
                switch (e) {
                    case 32:
                        return "F";
                    case 38:
                        return "U";
                    case 37:
                        return "L";
                    case 40:
                        return "D";
                    case 39:
                        return "R"
                }
                return ""
            },
            s = e.which ? e.which : e.keyCode,
            r = i(s);
        if ("" != r) {
            if (this.gamerunning) switch (r) {
                case "F":
                    t.keyboard.f = !0;
                    break;
                case "U":
                    t.keyboard.up = !0;
                    break;
                case "D":
                    t.keyboard.down = !0;
                    break;
                case "L":
                    t.keyboard.left = !0, t.playerSprite.facing = 0;
                    break;
                case "R":
                    t.keyboard.right = !0, t.playerSprite.facing = 1
            }
            e.returnValue = !1, e.preventDefault && e.preventDefault()
        }
    }, Game.prototype.uncaptureKeys = function(e, t) {
        "undefined" == typeof e && (e = window.event);
        var i = function(e) {
                switch (e) {
                    case 32:
                        return "F";
                    case 38:
                        return "U";
                    case 37:
                        return "L";
                    case 40:
                        return "D";
                    case 39:
                        return "R"
                }
                return ""
            },
            s = e.which ? e.which : e.keyCode,
            r = i(s);
        if ("" != r) {
            switch (r) {
                case "F":
                    t.keyboard.f = !1;
                    break;
                case "U":
                    t.keyboard.up = !1;
                    break;
                case "D":
                    t.keyboard.down = !1;
                    break;
                case "L":
                    t.keyboard.left = !1;
                    break;
                case "R":
                    t.keyboard.right = !1
            }
            e.returnValue = !1, e.preventDefault && e.preventDefault()
        }
    };
