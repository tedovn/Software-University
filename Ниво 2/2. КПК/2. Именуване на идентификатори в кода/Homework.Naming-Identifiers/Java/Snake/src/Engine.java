import java.awt.Canvas;
import java.awt.Dimension;
import java.awt.Graphics;

@SuppressWarnings("serial")
public class Engine extends Canvas implements Runnable {
	public static Snake MySnake;
	public static Apple Apple;
	static int points;
	
	private Graphics globalGraphics;
	private Thread runThread;
	public static final int DEFAULT_BOARD_WIDTH = 600;
	public static final int DEFAULT_BOARD_HEIGHT = 600;
	private final Dimension GAME_BOARD_SIZE = new Dimension(DEFAULT_BOARD_WIDTH, DEFAULT_BOARD_HEIGHT);
	
	static boolean gameRunning = false;
	
	public void paint(Graphics g){
		this.setPreferredSize(GAME_BOARD_SIZE);
		globalGraphics = g.create();
		points = 0;
		
		if(runThread == null){
			runThread = new Thread(this);
			runThread.start();
			gameRunning = true;
		}
	}
	
	public void run(){
		while(gameRunning){
			MySnake.tick();
			render(globalGraphics);
			try {
				Thread.sleep(100);
			} catch (Exception e) {
				// TODO: Catch this Exception! :)
			}
		}
	}
	
	public Engine(){	
		MySnake = new Snake();
		Apple = new Apple(MySnake);
	}
		
	public void render(Graphics g){
		g.clearRect(0, 0, DEFAULT_BOARD_WIDTH, DEFAULT_BOARD_HEIGHT+25);
		
		g.drawRect(0, 0, DEFAULT_BOARD_WIDTH, DEFAULT_BOARD_HEIGHT);			
		MySnake.drawSnake(g);
		Apple.drawApple(g);
		g.drawString("score= " + points, 10, DEFAULT_BOARD_HEIGHT + 25);		
	}
}

