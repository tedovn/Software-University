import java.awt.Color;
import java.awt.Graphics;
import java.util.Random;


public class Apple {
	public static Random CountGenerator;
	private Point AppleObject;
	private Color SnakeColor;
	
	public Apple(Snake s) {
		AppleObject = createApple(s);
		SnakeColor = Color.RED;		
	}
	
	private Point createApple(Snake s) {
		CountGenerator = new Random();
		int x = CountGenerator.nextInt(30) * 20; 
		int y = CountGenerator.nextInt(30) * 20;
		for (Point snakePoint : s.SnakeBody) {
			if (x == snakePoint.getX() || y == snakePoint.getY()) {
				return createApple(s);				
			}
		}
		return new Point(x, y);
	}
	
	public void drawApple(Graphics g){
		AppleObject.draw(g, SnakeColor);
	}	
	
	public Point givePoint() {
		// TODO Auto-generated method stub
		return AppleObject;
	}

	public Object givePoint1() {
		// TODO Auto-generated method stub
		return null;
	}
}
