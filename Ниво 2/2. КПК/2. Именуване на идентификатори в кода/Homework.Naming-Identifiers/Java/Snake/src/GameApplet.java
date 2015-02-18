import java.applet.Applet;
import java.awt.Dimension;
import java.awt.Graphics;

@SuppressWarnings("serial")
public class GameApplet extends Applet {
	private Engine game;
	ButtonCapture IH;
	
	public void init(){
		game = new Engine();
		game.setPreferredSize(new Dimension(800, 650));
		game.setVisible(true);
		game.setFocusable(true);
		this.add(game);
		this.setVisible(true);
		this.setSize(new Dimension(800, 650));
		IH = new ButtonCapture(game);
	}
	
	public void paint(Graphics g){
		this.setSize(new Dimension(800, 650));
	}

}
