import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class ButtonCapture implements KeyListener{
	
	public ButtonCapture(Engine game){
		game.addKeyListener(this);
	}
	
	public void keyPressed(KeyEvent e) {
		int keyCode = e.getKeyCode();
		
		if (keyCode == KeyEvent.VK_W || keyCode == KeyEvent.VK_UP) {
			if(Engine.MySnake.getVelY() != 20){
				Engine.MySnake.setVelX(0);
				Engine.MySnake.setVelY(-20);
			}
		}
		if (keyCode == KeyEvent.VK_S || keyCode == KeyEvent.VK_DOWN) {
			if(Engine.MySnake.getVelY() != -20){
				Engine.MySnake.setVelX(0);
				Engine.MySnake.setVelY(20);
			}
		}
		if (keyCode == KeyEvent.VK_D || keyCode == KeyEvent.VK_RIGHT) {
			if(Engine.MySnake.getVelX() != -20){
			Engine.MySnake.setVelX(20);
			Engine.MySnake.setVelY(0);
			}
		}
		if (keyCode == KeyEvent.VK_A || keyCode == KeyEvent.VK_LEFT) {
			if(Engine.MySnake.getVelX() != 20){
				Engine.MySnake.setVelX(-20);
				Engine.MySnake.setVelY(0);
			}
		}
		//Other controls
		if (keyCode == KeyEvent.VK_ESCAPE) {
			System.exit(0);
		}
	}
	
	public void keyReleased(KeyEvent e) {
	}
	
	public void keyTyped(KeyEvent e) {
		
	}

}
