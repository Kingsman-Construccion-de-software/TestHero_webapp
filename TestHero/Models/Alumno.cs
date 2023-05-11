using System;
 	/// <summary>
    /// Modelo que une la tabla de alumno
    /// Aqui se definen todas las atributos de alumno
    /// como lo son  idalumno, nombre, apellido, matricula, correo, password y idGrupo
    /// </summary>
public class Alumno
{
	public int IdAlumno { get; set; }
	public string Nombres { get; set; }
	public string Apellidos { get; set; }
	public string Matricula { get; set; }
	public string Correo { get; set; }
	public string Password { get; set; }
    public int IdGrupo { get; set; }
}
