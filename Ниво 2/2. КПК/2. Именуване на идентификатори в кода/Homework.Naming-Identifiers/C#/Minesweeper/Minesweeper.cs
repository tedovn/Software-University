namespace Minesweeper
{
    using System;
    using System.Collections.Generic;

    public class Minesweeper
    {
        private static void Main(string[] arguments)
        {
            string command = string.Empty;
            char[,] field = CreatePlayingField();
            char[,] bombs = BombPosition();
            int counter = 0;
            bool boom = false;
            List<RangList> champions = new List<RangList>(6);
            int row = 0;
            int column = 0;
            bool firstFlag = true;
            const int Max = 35;
            bool secondFlag = false;

            do
            {
                if (firstFlag)
                {
                    Console.WriteLine(
                        "Let`s play Minesweeper”.Try your luck to find the flight without any mines on them."
                        + " Command 'top' showes the ranking, 'restart' play new game, 'exit' quit the game and bye!");
                    Dump(field);
                    firstFlag = false;
                }

                Console.Write("Giva me row and column : ");
                command = Console.ReadLine().Trim();
                if (command.Length >= 3)
                {
                    if (int.TryParse(command[0].ToString(), out row) && int.TryParse(command[2].ToString(), out column)
                        && row <= field.GetLength(0) && column <= field.GetLength(1))
                    {
                        command = "turn";
                    }
                }

                switch (command)
                {
                    case "top":
                        Ranking(champions);
                        break;
                    case "restart":
                        field = CreatePlayingField();
                        bombs = BombPosition();
                        Dump(field);
                        boom = false;
                        firstFlag = false;
                        break;
                    case "exit":
                        Console.WriteLine("bye, bye, bye!");
                        break;
                    case "turn":
                        if (bombs[row, column] != '*')
                        {
                            if (bombs[row, column] == '-')
                            {
                                Move(field, bombs, row, column);
                                counter++;
                            }

                            if (Max == counter)
                            {
                                secondFlag = true;
                            }
                            else
                            {
                                Dump(field);
                            }
                        }
                        else
                        {
                            boom = true;
                        }

                        break;
                    default:
                        Console.WriteLine("\nError! Invalid command!\n");
                        break;
                }

                if (boom)
                {
                    Dump(bombs);
                    Console.Write("\nHrrrrrr! Die like a hero with {0} points. " + "Write you nick: ", counter);
                    string nickName = Console.ReadLine();
                    RangList t = new RangList(nickName, counter);
                    if (champions.Count < 5)
                    {
                        champions.Add(t);
                    }
                    else
                    {
                        for (int i = 0; i < champions.Count; i++)
                        {
                            if (champions[i].Points < t.Points)
                            {
                                champions.Insert(i, t);
                                champions.RemoveAt(champions.Count - 1);
                                break;
                            }
                        }
                    }

                    champions.Sort((RangList r1, RangList r2) => r2.Player.CompareTo(r1.Player));
                    champions.Sort((RangList r1, RangList r2) => r2.Points.CompareTo(r1.Points));
                    Ranking(champions);

                    field = CreatePlayingField();
                    bombs = BombPosition();
                    counter = 0;
                    boom = false;
                    firstFlag = true;
                }

                if (secondFlag)
                {
                    Console.WriteLine("\nCongratulations! You open 35 fileds without drop of blood.");
                    Dump(bombs);
                    Console.WriteLine("Write you name: ");
                    string name = Console.ReadLine();
                    RangList points = new RangList(name, counter);
                    champions.Add(points);
                    Ranking(champions);
                    field = CreatePlayingField();
                    bombs = BombPosition();
                    counter = 0;
                    secondFlag = false;
                    firstFlag = true;
                }
            }
            while (command != "exit");
            Console.WriteLine("Made in Bulgaria - Uauahahahahaha!");
            Console.Read();
        }

        private static void Ranking(List<RangList> points)
        {
            Console.WriteLine("\nPoints:");
            if (points.Count > 0)
            {
                for (int i = 0; i < points.Count; i++)
                {
                    Console.WriteLine("{0}. {1} --> {2} fields", i + 1, points[i].Player, points[i].Points);
                }

                Console.WriteLine();
            }
            else
            {
                Console.WriteLine("Empty ranking list!\n");
            }
        }

        private static void Move(char[,] field, char[,] bombs, int row, int column)
        {
            char countBombs = CountRows(bombs, row, column);
            bombs[row, column] = countBombs;
            field[row, column] = countBombs;
        }

        private static void Dump(char[,] board)
        {
            int row = board.GetLength(0);
            int column = board.GetLength(1);
            Console.WriteLine("\n    0 1 2 3 4 5 6 7 8 9");
            Console.WriteLine("   ---------------------");
            for (int i = 0; i < row; i++)
            {
                Console.Write("{0} | ", i);
                for (int j = 0; j < column; j++)
                {
                    Console.Write(string.Format("{0} ", board[i, j]));
                }

                Console.Write("|");
                Console.WriteLine();
            }

            Console.WriteLine("   ---------------------\n");
        }

        private static char[,] CreatePlayingField()
        {
            int boardRows = 5;
            int boardColumns = 10;
            char[,] board = new char[boardRows, boardColumns];
            for (int i = 0; i < boardRows; i++)
            {
                for (int j = 0; j < boardColumns; j++)
                {
                    board[i, j] = '?';
                }
            }

            return board;
        }

        private static char[,] BombPosition()
        {
            int rows = 5;
            int columns = 10;
            char[,] playingField = new char[rows, columns];

            for (int i = 0; i < rows; i++)
            {
                for (int j = 0; j < columns; j++)
                {
                    playingField[i, j] = '-';
                }
            }

            List<int> thirdRow = new List<int>();
            while (thirdRow.Count < 15)
            {
                Random random = new Random();
                int asfd = random.Next(50);
                if (!thirdRow.Contains(asfd))
                {
                    thirdRow.Add(asfd);
                }
            }

            foreach (int i2 in thirdRow)
            {
                int column = i2 / columns;
                int row = i2 % columns;
                if (row == 0 && i2 != 0)
                {
                    column--;
                    row = columns;
                }
                else
                {
                    row++;
                }

                playingField[column, row - 1] = '*';
            }

            return playingField;
        }

        private static void Field(char[,] field)
        {
            int column = field.GetLength(0);
            int row = field.GetLength(1);

            for (int i = 0; i < column; i++)
            {
                for (int j = 0; j < row; j++)
                {
                    if (field[i, j] != '*')
                    {
                        char points = CountRows(field, i, j);
                        field[i, j] = points;
                    }
                }
            }
        }

        private static char CountRows(char[,] rows, int firstRow, int secondRow)
        {
            int count = 0;
            int row = rows.GetLength(0);
            int column = rows.GetLength(1);

            if (firstRow - 1 >= 0)
            {
                if (rows[firstRow - 1, secondRow] == '*')
                {
                    count++;
                }
            }

            if (firstRow + 1 < row)
            {
                if (rows[firstRow + 1, secondRow] == '*')
                {
                    count++;
                }
            }

            if (secondRow - 1 >= 0)
            {
                if (rows[firstRow, secondRow - 1] == '*')
                {
                    count++;
                }
            }

            if (secondRow + 1 < column)
            {
                if (rows[firstRow, secondRow + 1] == '*')
                {
                    count++;
                }
            }

            if ((firstRow - 1 >= 0) && (secondRow - 1 >= 0))
            {
                if (rows[firstRow - 1, secondRow - 1] == '*')
                {
                    count++;
                }
            }

            if ((firstRow - 1 >= 0) && (secondRow + 1 < column))
            {
                if (rows[firstRow - 1, secondRow + 1] == '*')
                {
                    count++;
                }
            }

            if ((firstRow + 1 < row) && (secondRow - 1 >= 0))
            {
                if (rows[firstRow + 1, secondRow - 1] == '*')
                {
                    count++;
                }
            }

            if ((firstRow + 1 < row) && (secondRow + 1 < column))
            {
                if (rows[firstRow + 1, secondRow + 1] == '*')
                {
                    count++;
                }
            }

            return char.Parse(count.ToString());
        }

        public class RangList
        {
            private string name;

            private int points;

            public RangList()
            {
            }

            public RangList(string name, int points)
            {
                this.name = name;
                this.points = points;
            }

            public string Player
            {
                get
                {
                    return this.name;
                }

                set
                {
                    this.name = value;
                }
            }

            public int Points
            {
                get
                {
                    return this.points;
                }

                set
                {
                    this.points = value;
                }
            }
        }
    }
}