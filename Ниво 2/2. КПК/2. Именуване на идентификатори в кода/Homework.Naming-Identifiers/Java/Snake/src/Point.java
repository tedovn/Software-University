import java.awt.Color;
import java.awt.Graphics;

public class Point {
	private int X, Y;
	private final int WIDTH = 20;
	private final int HEIGHT = 20;
	
	public Point(Point p){
		this(p.X, p.Y);
	}
	
	public Point(int x, int y){
		this.X = x;
		this.Y = y;
	}	
		
	public int getX() {
		return X;
	}
	public void setX(int x) {
		this.X = x;
	}
	public int getY() {
		return Y;
	}
	public void setY(int y) {
		this.Y = y;
	}
	
	public void draw(Graphics g, Color color) {
		g.setColor(Color.BLACK);
		g.fillRect(X, Y, WIDTH, HEIGHT);
		g.setColor(color);
		g.fillRect(X+1, Y+1, WIDTH-2, HEIGHT-2);		
	}
	
	public String toString() {
		return "[x=" + X + ",y=" + Y + "]";
	}
	
	public boolean equals(Object object) {
        if (object instanceof Point) {
            Point point = (Point)object;
            return (X == point.X) && (Y == point.Y);
        }
        return false;
    }
}
