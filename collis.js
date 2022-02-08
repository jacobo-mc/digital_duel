function detectRectCollision(rect1,rect2){
	if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.y + rect1.height > rect2.y) {
    return true;
 }else{
	 return false;
 };
};
function detectCircleCollision(circle1,circle2){
	var dx = circle1.x - circle2.x;
	var dy = circle1.y - circle2.y;
	var distance = Math.sqrt(dx * dx + dy * dy);

	if (distance < circle1.radius + circle2.radius) {
    return true;
	}else{
		return false;
	};
};
function detectRectCircleCollision(circle,rect){
    var distX = Math.abs(circle.x - rect.x-rect.width/2);
    var distY = Math.abs(circle.y - rect.y-rect.height/2);

    if (distX > (rect.width/2 + circle.radius)) { return false; }
    if (distY > (rect.height/2 + circle.radius)) { return false; }

    if (distX <= (rect.width/2)) { return true; } 
    if (distY <= (rect.height/2)) { return true; }

    var dx=distX-rect.width/2;
    var dy=distY-rect.height/2;
    return (dx*dx+dy*dy<=(circle.radius*circle.radius));
}
