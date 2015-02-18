namespace Event
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    internal class Event : IComparable, IEnumerable
    {
        private DateTime date;

        private String location;

        private String title;

        public Event(DateTime date, String title, String location)
        {
            this.date = date;
            this.title = title;
            this.location = location;
        }

        public DateTime Date
        {
            get 
            { 
                return this.date; 
            }

            set 
            { 
                this.date = value; 
            }
        }

        public string Location
        {
            get { return this.location; }
            set { this.location = value; }
        }

        public string Title
        {
            get { return this.title; }
            set { this.title = value; }
        }

        public int CompareTo(object obj)
        {
            var other = obj as Event;
            int byDate = date.CompareTo(other.date);
            int byTitle = title.CompareTo(other.title);
            int byLocation = location.CompareTo(other.location);

            if (byDate == 0)
            {
                if (byTitle == 0)
                {
                    return byLocation;
                }
                else
                {
                    return byTitle;
                }
            }

            return byDate;
        }

        public override string ToString()
        {
            var sb = new StringBuilder();

            sb.Append(date.ToString("yyyy-MM-ddTHH:mm:ss"));
            sb.Append(" | " + title);

            if (String.IsNullOrEmpty(location))
            {
                sb.Append(" | " + location);
            }

            return sb.ToString();
        }

        public IEnumerator GetEnumerator()
        {
            // TO DO
            throw new NotImplementedException();
        }
    }

    internal class EventBuilder
    {
        private static readonly StringBuilder Output = new StringBuilder();
        private static readonly EventHolder Events = new EventHolder();

        private static void AddEvent(string command)
        {
            DateTime date;
            string title;
            string location;

            GetParameters(command, "AddEvent",
                out date, out title, out location);

            Events.AddEvent(date, title, location);
        }

        private static void DeleteEvents(string command)
        {
            string title = command.Substring("DeleteEvents".Length + 1);

            Events.DeleteEvents(title);
        }

        private static bool ExecuteNextCommand()
        {
            string command = Console.ReadLine();

            if (command[0] == 'A')
            {
                AddEvent(command);

                return true;
            }

            if (command[0] == 'D')
            {
                DeleteEvents(command);

                return true;
            }

            if (command[0] == 'L')
            {
                ListEvents(command);

                return true;
            }

            if (command[0] == 'E')
            {
                return false;
            }

            return false;
        }

        private static DateTime GetDate(string command, string commandType)
        {
            DateTime date = DateTime.Parse(command.Substring(commandType.Length + 1, 20));

            return date;
        }

        private static void GetParameters(string commandForExecution,
            string commandType,
            out DateTime dateAndTime,
            out string eventTitle,
            out string eventLocation)
        {
            dateAndTime = GetDate(commandForExecution, commandType);

            int firstPipeIndex = commandForExecution.IndexOf('|');
            int lastPipeIndex = commandForExecution.LastIndexOf('|');

            if (firstPipeIndex == lastPipeIndex)
            {
                eventTitle = commandForExecution.Substring(firstPipeIndex + 1).Trim();
                eventLocation = "";
            }
            else
            {
                eventTitle = commandForExecution.Substring(
                    firstPipeIndex + 1,
                    lastPipeIndex - firstPipeIndex - 1)
                    .Trim();

                eventLocation = commandForExecution.Substring(lastPipeIndex + 1).Trim();
            }
        }

        private static void ListEvents(string command)
        {
            int pipeIndex = command.IndexOf('|');
            DateTime date = GetDate(command, "ListEvents");
            string countString = command.Substring(pipeIndex + 1);
            int count = int.Parse(countString);

            Events.ListEvents(date, count);
        }

        public static void Main(string[] args)
        {
            while (ExecuteNextCommand())
            {
                Console.WriteLine(Output);
            }
        }

        private class EventHolder
        {
            private readonly ICollection<Event> byDate =
                new SortedSet<Event>();

            private readonly IDictionary<string, Event> byTitle =
                new Dictionary<string, Event>();

            public void AddEvent(DateTime date, string title, string location)
            {
                var newEvent = new Event(date, title, location);

                byTitle.Add(title.ToLower(), newEvent);
                byDate.Add(newEvent);

                Messages.EventAdded();
            }

            public void DeleteEvents(string titleToDelete)
            {
                string title = titleToDelete.ToLower();
                int removed = 0;

                foreach (var eventToRemove in byTitle)
                {
                    removed++;
                    byDate.Remove(eventToRemove.Value);
                }

                byTitle.Remove(title);

                Messages.EventDeleted(removed);
            }

            public void ListEvents(DateTime date, int count)
            {
                ICollection<Event> eventsToView =
                    byDate.Where(x => x.Date > date).ToList();

                int showed = 0;

                foreach (var eventToShow in eventsToView)
                {
                    if (showed == count)
                    {
                        break;
                    }

                    Messages.PrintEvent(eventToShow);
                    showed++;
                }

                if (showed == 0)
                {
                    Messages.NoEventsFound();
                }
            }
        }

        private static class Messages
        {
            public static void EventAdded()
            {
                Output.Append("Event added\n");
            }

            public static void EventDeleted(int x)
            {
                if (x == 0)
                {
                    NoEventsFound();
                }
                else
                {
                    Output.AppendFormat("{0} events deleted\n", x);
                }
            }

            public static void NoEventsFound()
            {
                Output.Append("No events found\n");
            }

            public static void PrintEvent(Event eventToPrint)
            {
                if (eventToPrint != null)
                {
                    Output.Append(eventToPrint + "\n");
                }
            }
        }
    }
}