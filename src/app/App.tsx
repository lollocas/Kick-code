import { Code2, Play, CheckCircle, Gamepad2, Calculator, Package, Trophy, TrendingUp, LogIn, UserPlus, X, Lightbulb, Clock, Shield, Trash2, Ban, LogOut, User, Bell, Settings, Edit, Timer } from "lucide-react";
import { useState, useEffect } from "react";

// Tipos
interface User {
  username: string;
  password: string;
  fullName: string;
  birthDate: string;
  email: string;
  createdAt: string;
}

interface Admin {
  username: string;
  password: string;
  fullName: string;
}

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export default function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Estados de autenticación
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  
  // Estados del formulario de login
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Estados del formulario de login admin
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  
  // Estados del formulario de registro
  const [registerFullName, setRegisterFullName] = useState("");
  const [registerBirthDate, setRegisterBirthDate] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  // Cargar usuario actual al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    const savedAdmin = localStorage.getItem('currentAdmin');
    if (savedAdmin) {
      setCurrentAdmin(JSON.parse(savedAdmin));
    }
    
    // Crear admin por defecto si no existe
    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
    if (admins.length === 0) {
      const defaultAdmin: Admin = {
        username: 'admin',
        password: 'admin123',
        fullName: 'Administrador'
      };
      localStorage.setItem('admins', JSON.stringify([defaultAdmin]));
    }
  }, []);

  // Funciones de autenticación
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Permitir acceso siempre, sin validaciones
    if (!loginUsername) {
      return;
    }

    // Crear usuario con el nombre ingresado
    const user: User = {
      username: loginUsername,
      password: loginPassword,
      fullName: loginUsername,
      birthDate: "",
      email: "",
      createdAt: new Date().toISOString()
    };

    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setShowLoginModal(false);
    setLoginUsername("");
    setLoginPassword("");
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Permitir acceso siempre como admin
    if (!adminUsername) {
      return;
    }

    const admin: Admin = {
      username: adminUsername,
      password: adminPassword,
      fullName: 'Administrador'
    };

    setCurrentAdmin(admin);
    localStorage.setItem('currentAdmin', JSON.stringify(admin));
    setShowAdminLoginModal(false);
    setAdminUsername("");
    setAdminPassword("");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");

    // Validaciones
    if (!registerFullName || !registerBirthDate || !registerEmail || !registerUsername || !registerPassword) {
      setRegisterError("Por favor completa todos los campos");
      return;
    }

    if (registerPassword.length < 6) {
      setRegisterError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Verificar si el usuario ya existe
    const userExists = users.some((u: User) => u.username === registerUsername || u.email === registerEmail);
    if (userExists) {
      setRegisterError("El usuario o correo electrónico ya está registrado");
      return;
    }

    // Crear nuevo usuario
    const newUser: User = {
      username: registerUsername,
      password: registerPassword,
      fullName: registerFullName,
      birthDate: registerBirthDate,
      email: registerEmail,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setRegisterSuccess("¡Cuenta creada exitosamente! Ahora puedes iniciar sesión");
    
    // Limpiar formulario
    setTimeout(() => {
      setRegisterFullName("");
      setRegisterBirthDate("");
      setRegisterEmail("");
      setRegisterUsername("");
      setRegisterPassword("");
      setRegisterSuccess("");
      setShowRegisterModal(false);
      setShowLoginModal(true);
    }, 2000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const handleAdminLogout = () => {
    setCurrentAdmin(null);
    localStorage.removeItem('currentAdmin');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-purple-900/50 bg-gradient-to-r from-black via-purple-950/30 to-black backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                CodeLevel Gamer
              </span>
            </div>
            
            <div className="flex items-center gap-8">
              <a href="#inicio" className="hover:text-purple-400 transition-colors">Inicio</a>
              <a href="#ejercicios" className="hover:text-purple-400 transition-colors">Ejercicios</a>
              <a href="#lenguajes" className="hover:text-purple-400 transition-colors">Lenguajes</a>
              <a href="#proyectos" className="hover:text-purple-400 transition-colors">Proyectos</a>
              <a href="#progreso" className="hover:text-purple-400 transition-colors">Progreso</a>
              
              {/* Botones de autenticación */}
              {currentAdmin ? (
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-yellow-400">Admin: {currentAdmin.fullName}</span>
                  <button 
                    onClick={handleAdminLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                  </button>
                </div>
              ) : currentUser ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm text-purple-400">{currentUser.username}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 top-10 bg-black/50 border border-purple-800/50 rounded-2xl p-4 shadow-2xl shadow-purple-900/50 z-50">
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar sesión
                      </button>
                      
                      <button 
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                      >
                        <Settings className="w-4 h-4" />
                        Configuración
                      </button>
                      
                      <button 
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                      >
                        <Edit className="w-4 h-4" />
                        Editar perfil
                      </button>
                      
                      <button 
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                      >
                        <Timer className="w-4 h-4" />
                        Tiempo de sesión
                      </button>
                      
                      <button 
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                      >
                        <Bell className="w-4 h-4" />
                        Notificaciones
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setShowLoginModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50"
                  >
                    <LogIn className="w-4 h-4" />
                    Iniciar sesión
                  </button>
                  <button 
                    onClick={() => setShowRegisterModal(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-purple-600 rounded-lg hover:bg-purple-900/30 transition-all"
                  >
                    <UserPlus className="w-4 h-4" />
                    Registrarse
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Modal de Iniciar Sesión */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-purple-900/50 relative">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-purple-400 mb-6">Iniciar Sesión</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-purple-300 mb-2">Usuario</label>
                <input 
                  type="text" 
                  placeholder="Ingresa tu usuario"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm text-purple-300 mb-2">Contraseña</label>
                <input 
                  type="password" 
                  placeholder="Ingresa tu contraseña"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                />
              </div>
              
              <button onClick={handleLogin} className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 font-semibold mt-6">
                Ingresar
              </button>
              
              {/* Enlace a login de administrador */}
              <div className="mt-4 text-center">
                <button 
                  onClick={() => {
                    setShowLoginModal(false);
                    setShowAdminLoginModal(true);
                  }}
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 justify-center w-full"
                >
                  <Shield className="w-4 h-4" />
                  Iniciar sesión como administrador
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Iniciar Sesión Admin */}
      {showAdminLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-purple-900/50 relative">
            <button 
              onClick={() => setShowAdminLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-purple-400 mb-6">Iniciar Sesión Admin</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-purple-300 mb-2">Usuario</label>
                <input 
                  type="text" 
                  placeholder="Ingresa tu usuario"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm text-purple-300 mb-2">Contraseña</label>
                <input 
                  type="password" 
                  placeholder="Ingresa tu contraseña"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                />
              </div>
              
              <button onClick={handleAdminLogin} className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 font-semibold mt-6">
                Ingresar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Registro */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 to-black border border-purple-800/50 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-purple-900/50 relative">
            <button 
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-purple-400 mb-6">Crear Cuenta</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-purple-300 mb-2">Nombre completo</label>
                <input 
                  type="text" 
                  placeholder="Ingresa tu nombre completo"
                  value={registerFullName}
                  onChange={(e) => setRegisterFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm text-purple-300 mb-2">Fecha de nacimiento</label>
                <input 
                  type="date" 
                  value={registerBirthDate}
                  onChange={(e) => setRegisterBirthDate(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm text-purple-300 mb-2">Correo electrónico</label>
                <input 
                  type="email" 
                  placeholder="ejemplo@correo.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm text-purple-300 mb-2">Usuario</label>
                <input 
                  type="text" 
                  placeholder="Elige un nombre de usuario"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm text-purple-300 mb-2">Contraseña</label>
                <input 
                  type="password" 
                  placeholder="Crea una contraseña segura"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/50 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                />
              </div>
              
              {registerError && (
                <p className="text-red-400 text-sm mt-2">{registerError}</p>
              )}
              
              {registerSuccess && (
                <p className="text-green-400 text-sm mt-2">{registerSuccess}</p>
              )}
              
              <button onClick={handleRegister} className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 font-semibold mt-6">
                Crear cuenta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 space-y-16">
        
        {/* Si el administrador está logueado, mostrar solo el panel de administrador */}
        {currentAdmin ? (
          <>
            {/* Panel de Administrador para Admin */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-yellow-500" />
                <h2 className="text-3xl font-bold text-purple-400">Panel de Administración</h2>
              </div>
              
              <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 shadow-2xl shadow-purple-900/20">
                <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
                  <p className="text-yellow-300 text-sm">
                    ⚠ Panel de administración - Usuario: {currentAdmin.fullName}
                  </p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: "Carlos Mendoza", email: "carlos@email.com", status: "active", exercises: 45, lastLogin: "21/03/2026" },
                    { name: "Ana García", email: "ana@email.com", status: "active", exercises: 32, lastLogin: "20/03/2026" },
                    { name: "Luis Rodríguez", email: "luis@email.com", status: "blocked", exercises: 12, lastLogin: "15/03/2026" },
                    { name: "María López", email: "maria@email.com", status: "active", exercises: 67, lastLogin: "21/03/2026" },
                    { name: "Pedro Sánchez", email: "pedro@email.com", status: "active", exercises: 28, lastLogin: "19/03/2026" },
                  ].map((user, idx) => (
                    <div 
                      key={idx}
                      className="bg-black/50 border border-purple-800/50 rounded-xl p-5 hover:border-purple-600 transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-purple-300">{user.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.status === 'active' 
                                ? 'bg-green-900/30 text-green-400 border border-green-700/50' 
                                : 'bg-red-900/30 text-red-400 border border-red-700/50'
                            }`}>
                              {user.status === 'active' ? 'Activo' : 'Bloqueado'}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-1">{user.email}</p>
                          <div className="flex gap-4 text-xs text-gray-500">
                            <span>Ejercicios: {user.exercises}</span>
                            <span>Último acceso: {user.lastLogin}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button className="flex items-center gap-2 px-4 py-2 bg-red-900/30 border border-red-700/50 rounded-lg hover:bg-red-900/50 transition-all text-red-400 text-sm">
                            <Trash2 className="w-4 h-4" />
                            Eliminar
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-orange-900/30 border border-orange-700/50 rounded-lg hover:bg-orange-900/50 transition-all text-orange-400 text-sm">
                            <Ban className="w-4 h-4" />
                            {user.status === 'active' ? 'Bloquear' : 'Desbloquear'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-700/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Total de usuarios</p>
                    <p className="text-3xl font-bold text-purple-300">156</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-900/30 to-black border border-green-700/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Usuarios activos</p>
                    <p className="text-3xl font-bold text-green-300">142</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-700/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Usuarios bloqueados</p>
                    <p className="text-3xl font-bold text-red-300">14</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Contenido para usuarios normales */}
        
        {/* Sección: Recomendaciones con IA (HU-09) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-purple-400">Recomendaciones para ti</h2>
          </div>
          
          <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 shadow-2xl shadow-purple-900/20">
            <p className="text-purple-200 mb-6">
              Basado en tus errores en bucles, te recomendamos practicar estos ejercicios
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Bucles While", difficulty: "Fácil", progress: 0 },
                { title: "Iteración con For", difficulty: "Medio", progress: 0 },
                { title: "Bucles anidados", difficulty: "Difícil", progress: 0 }
              ].map((exercise, idx) => (
                <div 
                  key={idx}
                  className="bg-black/50 border border-purple-800/50 rounded-xl p-4 hover:border-purple-600 transition-all group"
                >
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">{exercise.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">Dificultad:</span>
                    <span className={`text-sm font-semibold ${
                      exercise.difficulty === 'Fácil' ? 'text-green-400' :
                      exercise.difficulty === 'Medio' ? 'text-yellow-400' : 'text-red-400'
                    }`}>{exercise.difficulty}</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50 text-sm font-semibold">
                    Practicar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1: Ejercicios de Sintaxis (HU-01) */}
        <section id="ejercicios" className="space-y-6">
          <h2 className="text-3xl font-bold text-purple-400">Ejercicios de Sintaxis</h2>
          
          <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 shadow-2xl shadow-purple-900/20">
            <div className="mb-4 p-4 bg-purple-900/30 rounded-lg border border-purple-700/50">
              <p className="text-purple-200">Corrige el error de sintaxis:</p>
            </div>
            
            <div className="bg-black/80 rounded-xl p-6 border border-purple-900/50 font-mono text-sm mb-6">
              <div className="flex gap-4">
                <div className="text-gray-600">
                  <div>1</div>
                  <div>2</div>
                </div>
                <div className="flex-1">
                  <div className="text-red-400">for i in range(5)</div>
                  <div className="text-purple-300">    print(i)</div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70">
                Verificar sintaxis
              </button>
              
              {/* Botón Ver Solución (HU-13) */}
              <button 
                onClick={() => setShowSolution(!showSolution)}
                className="px-8 py-3 border border-purple-600 rounded-lg hover:bg-purple-900/30 transition-all"
              >
                {showSolution ? 'Ocultar solución' : 'Ver solución'}
              </button>
            </div>
            
            {/* Panel de Solución */}
            {showSolution && (
              <div className="mt-6 bg-gradient-to-br from-green-950/50 to-black border border-green-800/50 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Solución correcta
                </h3>
                
                <div className="bg-black/80 rounded-xl p-6 border border-green-900/50 font-mono text-sm">
                  <div className="flex gap-4">
                    <div className="text-gray-600">
                      <div>1</div>
                      <div>2</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-green-400">for i in range(5):</div>
                      <div className="text-purple-300">    print(i)</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                  <p className="text-green-300 font-semibold mb-2">Explicación:</p>
                  <p className="text-green-200 text-sm">
                    En Python, los bucles for deben terminar con dos puntos (:) para indicar el inicio del bloque de código.
                  </p>
                </div>
                
                <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                  <p className="text-green-300 font-semibold mb-2">Posibles variantes:</p>
                  <div className="bg-black/50 rounded-lg p-3 font-mono text-sm">
                    <div className="text-green-400">for i in range(0, 5):</div>
                    <div className="text-purple-300 ml-4">print(i)</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section 2: Detector automático de errores (HU-02) */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-purple-400">Detector Automático de Errores</h2>
          
          <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 shadow-2xl shadow-purple-900/20">
            <div className="bg-black/80 rounded-xl p-6 border border-purple-900/50 font-mono text-sm mb-4">
              <div className="flex gap-4">
                <div className="text-gray-600">
                  <div>1</div>
                  <div>2</div>
                </div>
                <div className="flex-1">
                  <div className="bg-red-900/30 border-l-4 border-red-500 pl-2 text-red-400">for i in range(5)</div>
                  <div className="text-purple-300">    print(i)</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
              <div className="text-red-500 mt-1">⚠</div>
              <p className="text-red-300">Error de sintaxis detectado en la línea 1: falta ':'</p>
            </div>
          </div>
        </section>

        {/* Section 3: Retroalimentación inmediata (HU-03) */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-purple-400">Retroalimentación Inmediata</h2>
          
          <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 shadow-2xl shadow-purple-900/20">
            <div className="bg-black/80 rounded-xl p-6 border border-purple-900/50 font-mono text-sm mb-4">
              <div className="flex gap-4">
                <div className="text-gray-600">
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                </div>
                <div className="flex-1">
                  <div className="text-purple-300">for i in range(5):</div>
                  <div className="text-purple-300">    print(i)</div>
                  <div className="text-gray-500"># Output: 0 1 2 3 4</div>
                </div>
              </div>
            </div>
            
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 mb-4 flex items-center gap-2">
              <Play className="w-5 h-5" />
              Ejecutar código
            </button>
            
            <div className="flex items-start gap-3 p-4 bg-green-900/20 border border-green-700/50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <p className="text-green-400 font-semibold">✓ Código correcto</p>
                <p className="text-green-300 text-sm mt-1">Tu código funciona correctamente</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Selección de lenguaje (HU-04) */}
        <section id="lenguajes" className="space-y-6">
          <h2 className="text-3xl font-bold text-purple-400">Selecciona el lenguaje</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Python", icon: "🐍" },
              { name: "Java", icon: "☕" },
              { name: "C++", icon: "⚡" },
              { name: "JavaScript", icon: "🚀" }
            ].map((lang) => (
              <div
                key={lang.name}
                className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-8 hover:border-purple-600 transition-all cursor-pointer shadow-lg hover:shadow-purple-500/50 group"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{lang.icon}</div>
                <h3 className="text-xl font-bold text-purple-300 group-hover:text-purple-200">{lang.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Ejercicios por tipo de proyecto (HU-05) */}
        <section id="proyectos" className="space-y-6">
          <h2 className="text-3xl font-bold text-purple-400">Ejercicios por Tipo de Proyecto</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Calculadora", icon: Calculator, color: "from-purple-600 to-pink-600" },
              { name: "Sistema de Inventario", icon: Package, color: "from-purple-600 to-blue-600" },
              { name: "Juego simple", icon: Gamepad2, color: "from-purple-600 to-green-600" },
              { name: "Gestión de estudiantes", icon: Trophy, color: "from-purple-600 to-orange-600" }
            ].map((project) => (
              <div
                key={project.name}
                className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 hover:border-purple-600 transition-all cursor-pointer shadow-lg hover:shadow-purple-500/50 group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <project.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-300 group-hover:text-purple-200">{project.name}</h3>
                    <p className="text-gray-500 text-sm">Práctica con proyectos reales</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Sistema de dificultad adaptativa (HU-06) */}
        <section id="progreso" className="space-y-6">
          <h2 className="text-3xl font-bold text-purple-400">Sistema de Dificultad Adaptativa</h2>
          
          <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-8 shadow-2xl shadow-purple-900/20">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-gray-400 text-sm">Nivel actual:</p>
                <p className="text-2xl font-bold text-purple-300">Intermedio</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progreso general</span>
                <span className="text-purple-400">65%</span>
              </div>
              <div className="h-4 bg-black/50 rounded-full overflow-hidden border border-purple-900/50">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg shadow-purple-500/50"
                  style={{ width: '65%' }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/50 rounded-xl p-4 border border-purple-900/50">
                <p className="text-gray-400 text-sm">Ejercicios completados</p>
                <p className="text-3xl font-bold text-purple-300">24</p>
              </div>
              <div className="bg-black/50 rounded-xl p-4 border border-purple-900/50">
                <p className="text-gray-400 text-sm">Racha actual</p>
                <p className="text-3xl font-bold text-purple-300">7 días</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/50 rounded-lg">
              <Trophy className="w-6 h-6 text-yellow-500 mt-1" />
              <div>
                <p className="text-purple-200 font-semibold">¡Felicitaciones!</p>
                <p className="text-purple-300 text-sm mt-1">Has mejorado tu rendimiento. Se desbloquea el nivel avanzado.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección: Historial de Ejercicios (HU-12) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold text-purple-400">Historial de Ejercicios</h2>
          </div>
          
          <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-800/50 rounded-2xl p-6 shadow-2xl shadow-purple-900/20">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-800/50">
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Ejercicio</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Estado</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Fecha</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Tiempo</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Intentos</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Bucle For básico", status: "correct", date: "21/03/2026", attempts: 1, time: "2m 15s" },
                    { name: "Condicionales if-else", status: "correct", date: "20/03/2026", attempts: 2, time: "4m 32s" },
                    { name: "Funciones con parámetros", status: "incorrect", date: "19/03/2026", attempts: 3, time: "6m 45s" },
                    { name: "Listas y arrays", status: "correct", date: "18/03/2026", attempts: 1, time: "1m 58s" },
                    { name: "Bucles anidados", status: "incorrect", date: "17/03/2026", attempts: 4, time: "8m 12s" },
                    { name: "Manejo de strings", status: "correct", date: "16/03/2026", attempts: 2, time: "3m 27s" },
                  ].map((exercise, idx) => (
                    <tr 
                      key={idx} 
                      className="border-b border-purple-900/30 hover:bg-purple-900/20 transition-colors"
                    >
                      <td className="py-4 px-4 text-purple-200">{exercise.name}</td>
                      <td className="py-4 px-4">
                        {exercise.status === "correct" ? (
                          <span className="flex items-center gap-2 text-green-400">
                            <CheckCircle className="w-5 h-5" />
                            Correcto
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-red-400">
                            <X className="w-5 h-5" />
                            Incorrecto
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-gray-400">{exercise.date}</td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-1 text-purple-300">
                          <Timer className="w-4 h-4" />
                          {exercise.time}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-purple-300">{exercise.attempts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

          </>
        )}
      </div>
    </div>
  );
}