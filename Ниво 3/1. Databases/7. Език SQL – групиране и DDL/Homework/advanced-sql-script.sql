-- Problem 1.	Write a SQL query to find the names and salaries of the employees that 
-- take the minimal salary in the company.

SELECT
	FirstName,
	LastName,
	Salary
FROM [SoftUni].[dbo].[Employees]
WHERE Salary = (SELECT
	MIN(Salary)
FROM [SoftUni].[dbo].[Employees])

--Problem 2.	Write a SQL query to find the names and salaries of the employees that
--have a salary that is up to 10% higher than the minimal salary for the company.

SELECT
	FirstName,
	LastName,
	Salary
FROM [SoftUni].[dbo].[Employees]
WHERE Salary <= (SELECT
	MIN(Salary)
FROM [SoftUni].[dbo].[Employees])
* 1.1

-- Problem 3.	Write a SQL query to find the full name, salary and 
-- department of the employees that take the minimal salary in their department.

SELECT
	FirstName + ' ' + LastName AS [Employee Name],
	Salary,
	d.Name
FROM [SoftUni].[dbo].[Employees] e
JOIN [SoftUni].[dbo].[Departments] d
	ON d.DepartmentID = e.DepartmentID
WHERE e.Salary = (SELECT
	MIN(Salary)
FROM [SoftUni].[dbo].[Employees] emp
WHERE emp.DepartmentID = e.DepartmentID)

-- Problem 4.	Write a SQL query to find the average salary in the department #1.

SELECT
	AVG(Salary) AS [Average Salary]
FROM [SoftUni].[dbo].[Employees] e
WHERE e.DepartmentID = 1

-- Problem 5.	Write a SQL query to find the average salary in the "Sales" department.

SELECT
	AVG(Salary) AS [Average Salary for Sales Department]
FROM [SoftUni].[dbo].[Employees] e
JOIN [SoftUni].[dbo].[Departments] d
	ON e.DepartmentID = d.DepartmentID
WHERE d.Name = 'Sales'

-- Problem 6.	Write a SQL query to find the number of employees in the "Sales" department.

SELECT
	COUNT(e.EmployeeID)
FROM [SoftUni].[dbo].[Employees] e
JOIN [SoftUni].[dbo].[Departments] d
	ON e.DepartmentID = d.DepartmentID
WHERE d.Name = 'Sales'

-- Problem 7.	Write a SQL query to find the number of all employees that have manager.

SELECT
	COUNT(e.EmployeeID)
FROM [SoftUni].[dbo].[Employees] e
WHERE e.ManagerID IS NOT NULL

-- Problem 8.	Write a SQL query to find the number of all employees that have no manager.

SELECT
	COUNT(e.EmployeeID)
FROM [SoftUni].[dbo].[Employees] e
WHERE e.ManagerID IS NULL

-- Problem 9.	Write a SQL query to find all departments and the average salary for each of them.

SELECT
	d.Name AS [Department],
	AVG(e.Salary) AS [Average Salary]
FROM [SoftUni].[dbo].[Employees] e
JOIN [SoftUni].[dbo].[Departments] d
	ON d.DepartmentID = e.DepartmentID
GROUP BY	d.DepartmentID,
			d.Name


-- Problem 10.	Write a SQL query to find the count of all employees in each department and for each town.

SELECT
	d.Name AS [Department],
	t.Name AS [Town],
	COUNT(e.EmployeeID) AS [Employess Count]
FROM [SoftUni].[dbo].[Employees] e
JOIN [SoftUni].[dbo].[Departments] d
	ON d.DepartmentID = e.DepartmentID
JOIN [SoftUni].[dbo].[Addresses] a
	ON a.AddressID = e.AddressID
JOIN [SoftUni].[dbo].[Towns] t
	ON t.TownID = a.TownID
GROUP BY	d.Name,
			t.Name

-- Problem 12.	Write a SQL query to find all employees along with their managers.

SELECT
	e.FirstName + ' ' + e.LastName AS [Employeer Name],
	ISNULL(m.FirstName + ' ' + m.LastName, 'no manager') AS [Manager]
FROM [SoftUni].[dbo].[Employees] e
LEFT OUTER JOIN [SoftUni].[dbo].[Employees] m
	ON e.ManagerID = m.EmployeeID

-- Problem 13.	Write a SQL query to find the names of all employees whose last name is exactly 5 characters long. 

SELECT
	FirstName + ' ' + LastName
FROM [SoftUni].[dbo].[Employees]
WHERE LEN(LastName) = 5

-- Problem 14.	Write a SQL query to display the current date and time in the following format "day.month.year 

SELECT
	CONVERT(NVARCHAR, GETDATE(), 102) + ' ' + CONVERT(NVARCHAR, GETDATE(), 114) AS [Currnet Date]

-- Problem 15.	Write a SQL statement to create a table Users

DROP TABLE [SoftUni].[dbo].[Users]
CREATE TABLE [SoftUni].[dbo].[Users] 
(
Id INT IDENTITY(1,1) NOT NULL,
Username NVARCHAR(50) NOT NULL,
[Password] NVARCHAR(50) NOT NULL,
FullName NVARCHAR(100) NOT NULL,
LastLoginTime DATETIME NOT NULL DEFAULT GETDATE(),
CONSTRAINT PK_Users PRIMARY KEY(Id),
CONSTRAINT UK_Users_Username UNIQUE (Username),
CONSTRAINT CHK_Users_Password_Length CHECK (LEN([Password]) >= 5)
)
GO


-- Problem 16.	Write a SQL statement to create a view that displays 
-- the users from the Users table that have been in the system today.

IF OBJECT_ID('dbo.Users_View','V') IS NOT NULL
DROP VIEW dbo.Users_View;
GO
USE SoftUni;
GO
CREATE VIEW dbo.Users_View AS
SELECT
	*
FROM [SoftUni].[dbo].[Users]
WHERE LastLoginTime > DATEADD(DAY, DATEDIFF(DAY, 0, GETDATE()), -1)

-- Problem 17.	Write a SQL statement to create a table Groups. 

DROP TABLE [SoftUni].[dbo].[Groups]
CREATE TABLE [SoftUni].[dbo].[Groups] 
(
Id INT IDENTITY (1,1) NOT NULL,
Name NVARCHAR(50) NOT NULL,
CONSTRAINT PK_Groups PRIMARY KEY(Id),
CONSTRAINT UK_Groups_Name UNIQUE (Name)
)

-- Problem 18.	Write a SQL statement to add a column GroupID to the table Users.

ALTER TABLE [SoftUni].[dbo].[Users]
ADD GroupId INT;
ALTER TABLE Users
ADD CONSTRAINT FK_Users_Groups FOREIGN KEY(GroupId) REFERENCES Groups(Id)

INSERT INTO [SoftUni].[dbo].[Groups] (Name)
	VALUES ('Web Developers')
INSERT INTO [SoftUni].[dbo].[Groups] (Name)
	VALUES ('C#')
INSERT INTO [SoftUni].[dbo].[Groups] (Name)
	VALUES ('PHP')


UPDATE [SoftUni].[dbo].[Users]
SET GroupId = 1
WHERE Id = 1;
UPDATE [SoftUni].[dbo].[Users]
SET GroupId = 2
WHERE Id = 2;
UPDATE [SoftUni].[dbo].[Users]
SET GroupId = 3
WHERE Id = 3;

-- Problem 19.	Write SQL statements to insert several records in the Users and Groups tables.

INSERT INTO [SoftUni].[dbo].[Users] (Username, Password, FullName, LastLoginTime, GroupId)
	VALUES ('peshkata', '123456', 'Pesho', GETDATE(), 3)
INSERT INTO [SoftUni].[dbo].[Users] (Username, Password, FullName, LastLoginTime, GroupId)
	VALUES ('marcheto', 'marcheto123', 'Maria', GETDATE(), 2)
INSERT INTO [SoftUni].[dbo].[Users] (Username, Password, FullName, LastLoginTime, GroupId)
	VALUES ('valka', '12345', 'Vasil', GETDATE(), 1)

-- Problem 20.	Write SQL statements to update some of the records in the Users and Groups tables.

UPDATE [SoftUni].[dbo].[Groups]
SET Name = 'JavaScript'
WHERE Name = 'PHP'

UPDATE [SoftUni].[dbo].[Groups]
SET Name = 'OOP C#'
WHERE Name = 'C#'

UPDATE [SoftUni].[dbo].[Users]
SET Username = 'valkata'
WHERE Username = 'valka'

-- Problem 21.	Write SQL statements to delete some of the records from the Users and Groups tables.

DELETE FROM [SoftUni].[dbo].[Users]
WHERE Username = 'valkata'


DELETE FROM [SoftUni].[dbo].[Groups]
WHERE Name = 'OOP C#'

-- Problem 22.	Write SQL statements to insert in the Users table the names of all employees from the Employees table.

BEGIN TRAN
ALTER TABLE Users NOCHECK CONSTRAINT "CHK_Users_Password_Length";
INSERT INTO [SoftUni].[dbo].[Users] (Username, Password, FullName, GroupId)

	SELECT
		CONVERT(NVARCHAR(50), SUBSTRING(LOWER(FirstName), 0, 2) + '' + LOWER(LastName) + ISNULL(MiddleName, '')) AS Username,
		CONVERT(NVARCHAR(50), SUBSTRING(LOWER(FirstName), 1, 1) + '' + LOWER(LastName)) AS [Password],
		CONVERT(NVARCHAR(50), FirstName + ' ' + LastName) AS [FullName],
		2
	FROM [SoftUni].[dbo].[Employees]
ALTER TABLE Users CHECK CONSTRAINT "CHK_Users_Password_Length";
ROLLBACK TRAN


-- Problem 23.	Write a SQL statement that changes the password to NULL for all users 
-- that have not been in the system since 10.03.2010.

ALTER TABLE [SoftUni].[dbo].[Users]
ALTER COLUMN Password NVARCHAR(50) NULL

UPDATE [SoftUni].[dbo].[Users]
SET PASSWORD = NULL
WHERE LastLoginTime <= DATEFROMPARTS(2010, 03, 10)

-- Problem 24.	Write a SQL statement that deletes all users without passwords (NULL password).

DELETE FROM [SoftUni].[dbo].[Users]
WHERE Password IS NULL


-- Problem 25.	Write a SQL query to display the average employee salary by department and job title.

SELECT
	d.Name,
	e.JobTitle,
	AVG(e.Salary) AS [Average Salary]
FROM [SoftUni].[dbo].[Employees] e
JOIN [SoftUni].[dbo].[Departments] d
	ON e.DepartmentID = d.DepartmentID
GROUP BY	D.Name,
			e.JobTitle

-- Problem 26.	Write a SQL query to display the minimal employee salary 
-- by department and job title along with the name of some of the employees that take it.

SELECT
	d.Name AS [Department],
	e.JobTitle,
	(SELECT
		MAX(minSalary.FirstName)
	FROM [SoftUni].[dbo].[Employees] AS minSalary
	WHERE d.DepartmentID = minSalary.DepartmentID
	AND MIN(e.Salary) = minSalary.Salary
	AND e.JobTitle = minSalary.JobTitle)
	AS [FirstName],
	MIN(e.Salary) AS [Min Salary]
FROM [SoftUni].[dbo].[Employees] e
JOIN [SoftUni].[dbo].[Departments] d
	ON e.DepartmentID = d.DepartmentID
GROUP BY	d.Name,
			d.DepartmentID,
			e.DepartmentID,
			e.JobTitle


-- Problem 27.	Write a SQL query to display the town where maximal number of employees work.

SELECT TOP 1 t.Name, COUNT(e.EmployeeID) AS [Number of Employees]
FROM [SoftUni].[dbo].[Employees] e
JOIN [SoftUni].[dbo].[Addresses] a
ON e.AddressID = a.AddressID
JOIN [SoftUni].[dbo].[Towns] t
ON a.TownID = t.TownID
GROUP BY t.Name
ORDER BY COUNT(e.EmployeeID) DESC


-- 28 
SELECT
	Managers.TownName AS Town,
	COUNT(Managers.managerId) AS [Number of managers]
FROM (SELECT DISTINCT
	e.EmployeeID AS managerId,
	t.Name AS TownName
FROM Employees e
JOIN Employees m
	ON e.EmployeeID = m.ManagerID
JOIN Addresses a
	ON a.AddressID = e.AddressID
JOIN Towns t
	ON t.TownID = a.TownID) AS Managers
GROUP BY Managers.TownName

-- 29 

CREATE TABLE dbo.WorkHours
(
    WorkHoursId int IDENTITY(1,1) NOT NULL,
    EmployeeId INT NOT NULL,
	WorkDate DATETIME NULL,
	Task NVARCHAR(500) NOT NULL,
	WorkHours DECIMAL(5,2) NOT NULL, 
	Comments NVARCHAR(MAX) NULL,
	CONSTRAINT PK_WorkHours PRIMARY KEY (WorkHoursId),
	CONSTRAINT FK_WorkHours_Employees FOREIGN KEY (EmployeeId) REFERENCES Employees(EmployeeID)
)
GO

--Problem 30.	
--Issue few SQL statements to insert, update and delete of some data in the table.

INSERT INTO WorkHours (EmployeeId, WorkDate, Task, WorkHours, Comments)
	VALUES (1, '2013-12-20', 'BGCoder Project: accept zip file', 6.5, 'Initial class structure created');
INSERT INTO WorkHours (EmployeeId, WorkDate, Task, WorkHours, Comments)
	VALUES (33, '2013-12-20', 'BGCoder Project: accept zip file', 6.5, 'Initial class structure created');
INSERT INTO WorkHours (EmployeeId, WorkDate, Task, WorkHours, Comments)
	VALUES (220, '2013-12-20', 'BGCoder Project: accept zip file', 3.33, 'Initial class structure created');
INSERT INTO WorkHours (EmployeeId, WorkDate, Task, WorkHours, Comments)
	VALUES (133, '2013-12-21', 'BGCoder Project: accept zip file', 2.67, 'Bug fixed');
INSERT INTO WorkHours (EmployeeId, WorkDate, Task, WorkHours, Comments)
	VALUES (55, '2013-12-21', 'BGCoder Project: accept zip file', 1.08, 'some class implementation');
INSERT INTO WorkHours (EmployeeId, WorkDate, Task, WorkHours, Comments)
	VALUES (46, '2013-12-22', 'BGCoder Project: accept zip file', 2.33, 'Initial class structure created');

UPDATE WorkHours
SET WorkDate = '2013-12-21'
WHERE WorkHours.EmployeeId = 1;

DELETE FROM WorkHours
WHERE EmployeeId = 33;

--Problem 31.	
--Define a table WorkHoursLogs to track all changes in the WorkHours table with triggers.
--For each change keep the old record data, the new record data and 
--the command (insert / update / delete).

CREATE TABLE WorkHoursLogs
(
    WHLogId INT IDENTITY(1, 1) NOT NULL,
    Command varchar(10) NOT NULL,

	WorkHoursId_Old int NULL,
    EmployeeId_Old INT  NULL,
	WorkDate_Old DATETIME NULL,
	Task_Old NVARCHAR(500)  NULL,
	WorkHours_Old DECIMAL(5,2) NULL, 
	Comments_Old NVARCHAR(MAX) NULL,

	WorkHoursId_New int NULL,
    EmployeeId_New INT NULL,
	WorkDate_New DATETIME NULL,
	Task_New NVARCHAR(500) NULL,
	WorkHours_New DECIMAL(5,2) NULL, 
	Comments_New NVARCHAR(MAX) NULL,

	CONSTRAINT PK_WorkHoursLogs PRIMARY KEY (WHLogId)
)
GO

DROP TRIGGER TR_BeforeInsert_WorkHours
GO
CREATE TRIGGER TR_BeforeInsert_WorkHours
    ON WorkHours
    FOR INSERT
    AS
    BEGIN
SET NOCOUNT ON
INSERT INTO dbo.WorkHoursLogs (Command,
WorkHoursId_New, EmployeeId_New, WorkDate_New, Task_New, WorkHours_New, Comments_New)
	SELECT
		'INSERT',
		i.WorkHoursId,
		i.EmployeeId,
		i.WorkDate,
		i.Task,
		i.WorkHours,
		i.Comments
	FROM INSERTED i
END
GO

DROP TRIGGER TR_BeforeDelete_WorkHours
GO
CREATE TRIGGER TR_BeforeDelete_WorkHours
 ON WorkHours
    FOR DELETE
    AS
    BEGIN
SET NOCOUNT ON
INSERT INTO WorkHoursLogs (Command,
WorkHoursId_Old, EmployeeId_Old, WorkDate_Old, Task_Old, WorkHours_Old, Comments_Old)
	SELECT
		'DELETE',
		d.WorkHoursId,
		d.EmployeeId,
		d.WorkDate,
		d.Task,
		d.WorkHours,
		d.Comments
	FROM DELETED d
END
GO

DROP TRIGGER TR_BeforeUpdate_WorkHours
GO
CREATE TRIGGER TR_BeforeUpdate_WorkHours
 ON WorkHours
    FOR UPDATE
    AS
    BEGIN
SET NOCOUNT ON
INSERT INTO WorkHoursLogs (Command,
WorkHoursId_Old, EmployeeId_Old, WorkDate_Old, Task_Old, WorkHours_Old, Comments_Old,
WorkHoursId_New, EmployeeId_New, WorkDate_New, Task_New, WorkHours_New, Comments_New)
	SELECT
		'UPDATE',
		d.WorkHoursId,
		d.EmployeeId,
		d.WorkDate,
		d.Task,
		d.WorkHours,
		d.Comments,

		i.WorkHoursId,
		i.EmployeeId,
		i.WorkDate,
		i.Task,
		i.WorkHours,
		i.Comments
	FROM	DELETED d,
			INSERTED i
END
GO

--Problem 32.	
--Start a database transaction, delete all employees from the 'Sales' department along with all 
--dependent records from the other tables. At the end rollback the transaction.
ALTER TABLE employees
DROP CONSTRAINT FK_Employees_Departments;
ALTER TABLE employees
ADD CONSTRAINT FK_Employees_Departments FOREIGN KEY (ManagerID)
REFERENCES employees (EmployeeId) ON DELETE CASCADE;

ALTER TABLE Departments
DROP CONSTRAINT FK_Departments_Employees;
ALTER TABLE Departments
ADD CONSTRAINT FK_Departments_Employees FOREIGN KEY (DepartmentID)
REFERENCES Departments (DepartmentID) ON DELETE CASCADE

ALTER TABLE Departments
ADD CONSTRAINT FK_Departments_Employees FOREIGN KEY (ManagerID)
REFERENCES Employees (EmployeeID) ON DELETE CASCADE;


--FK_Employees_Employees
--FK_Employees_Addresses
--FK_EmployeesProjects_Employees
--FK_Employees_Departments
--FK_Departments_Employees

ALTER TABLE Employees
DROP CONSTRAINT FK_Employees_Employees
ALTER TABLE Employees
ADD CONSTRAINT FK_Employees_Employees FOREIGN KEY(ManagerId)
REFERENCES Employees(EmployeeID) ON DELETE CASCADE

BEGIN TRAN;
DELETE FROM employees
WHERE departmentID = (SELECT
		departmentId
	FROM departments
	WHERE Name = 'Sales');
ROLLBACK TRAN;

--Problem 33.	
--Start a database transaction and drop the table EmployeesProjects.
--Then how you could restore back the lost table data?

BEGIN TRAN
DROP TABLE EmployeesProjects
ROLLBACK TRAN

--Problem 34.	
--Find how to use temporary tables in SQL Server.
--Using temporary tables backup all records from EmployeesProjects and 
--restore them back after dropping and re-creating the table.

CREATE TABLE #EmployeesProjectSummary(
EmployeeID int,
ProjectID int
)
GO

INSERT INTO #EmployeesProjectSummary
	SELECT
		EmployeeID,
		ProjectID
	FROM employeesprojects
GO

DROP TABLE employeesprojects
GO

CREATE TABLE EmployeesProjects(
EmployeeID int ,
ProjectID int,
CONSTRAINT PK_EmployeesProjects PRIMARY KEY(EmployeeID, ProjectID),
CONSTRAINT FK_Employees_EmployeesProjects FOREIGN KEY (EmployeeID) REFERENCES employees(EmployeeID)
);

INSERT INTO EmployeesProjects
	SELECT
		*
	FROM #EmployeesProjectSummary
GO

DROP TABLE #EmployeesProjectSummary
GO