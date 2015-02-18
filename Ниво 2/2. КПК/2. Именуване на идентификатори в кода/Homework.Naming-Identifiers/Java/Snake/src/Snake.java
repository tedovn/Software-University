import java.awt.Color;
import java.awt.Graphics;
import java.util.LinkedList;

public class Snake {
	LinkedList<Point> SnakeBody = new LinkedList<Point>();
	private Color SnakeColor;
	private int velocityX, velocityY;

	public Snake() {
		SnakeColor = Color.GREEN;
		SnakeBody.add(new Point(300, 100));
		SnakeBody.add(new Point(280, 100));
		SnakeBody.add(new Point(260, 100));
		SnakeBody.add(new Point(240, 100));
		SnakeBody.add(new Point(220, 100));
		SnakeBody.add(new Point(200, 100));
		SnakeBody.add(new Point(180, 100));
		SnakeBody.add(new Point(160, 100));
		SnakeBody.add(new Point(140, 100));
		SnakeBody.add(new Point(120, 100));

		velocityX = 20;
		velocityY = 0;
	}

	public void drawSnake(Graphics g) {
		for (Point point : this.SnakeBody) {
			point.draw(g, SnakeColor);
		}
	}

	public void tick() {
		Point newPosition = new Point((SnakeBody.get(0).getX() + velocityX),
				(SnakeBody.get(0).getY() + velocityY));

		if (newPosition.getX() > Engine.DEFAULT_BOARD_WIDTH - 20) {
			Engine.gameRunning = false;
		} else if (newPosition.getX() < 0) {
			Engine.gameRunning = false;
		} else if (newPosition.getY() < 0) {
			Engine.gameRunning = false;
		} else if (newPosition.getY() > Engine.DEFAULT_BOARD_HEIGHT - 20) {
			Engine.gameRunning = false;
		} else if (Engine.Apple.givePoint().equals(newPosition)) {
			SnakeBody.add(Engine.Apple.givePoint());
			Engine.Apple = new Apple(this);
			Engine.points += 50;
		} else if (SnakeBody.contains(newPosition)) {
			Engine.gameRunning = false;
			System.out.println("You ate yourself");
		}

		for (int i = SnakeBody.size() - 1; i > 0; i--) {
			SnakeBody.set(i, new Point(SnakeBody.get(i - 1)));
		}
		SnakeBody.set(0, newPosition);
	}

	public int getVelX() {
		return velocityX;
	}

	public void setVelX(int velX) {
		this.velocityX = velX;
	}

	public int getVelY() {
		return velocityY;
	}

	public void setVelY(int velY) {
		this.velocityY = velY;
	}
}
