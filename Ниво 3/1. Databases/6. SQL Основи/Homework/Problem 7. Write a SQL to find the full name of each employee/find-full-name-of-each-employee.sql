use SoftUni

SELECT FirstName + ' ' + MiddleName + ' ' + LastName as FullName 
	FROM Employees
	WHERE MiddleName != 'NULL';