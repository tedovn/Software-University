SELECT e.FirstName, e.LastName, d.Name
	FROM Employees e
	INNER JOIN Departments d
	ON e.ManagerID = d.ManagerID