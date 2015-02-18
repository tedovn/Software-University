use SoftUni

SELECT e.FirstName, e.LastName,  d.Name, a.AddressText
	FROM Employees e
	INNER JOIN Departments d
	ON e.ManagerID = d.ManagerID
	INNER JOIN Addresses a
	ON a.AddressID = e.AddressID