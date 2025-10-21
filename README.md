
Aplicación web para la gestión y contratación de servicios para eventos sociales: catálogo de servicios por tipo de evento (infantiles, formales y corporativos), favoritos, carrito, reseñas, disponibilidad y gestión de precios con promociones.

Tecnologías:
- Vite + React + TypeScript
- Tailwind CSS y componentes UI (shadcn/ui)

Principales funcionalidades:
- Catálogo de servicios por tipo de evento con filtrado y destacados.
- Favoritos y carrito con cupones, impuestos y costos de envío simulados.
- Autenticación de demo por rol (cliente/proveedor) y dashboards.
- Gestión de disponibilidad por servicio/fecha (bloquear, capacidad, reservas simuladas).
- Gestión de precios: precio base, promociones por periodo y precio efectivo.
- Reseñas y estadísticas por servicio.
- Notificaciones locales por cambios relevantes (p. ej., precios).

Estructura general (src/):
- `contexts/`: estados globales (auth, eventos, carrito, precios, disponibilidad, reseñas, notificaciones).
- `components/`: UI y widgets (navegación, carrito lateral, modales, formularios, etc.).
- `pages/`: vistas de alto nivel (Dashboards, Gestión de Precios/Disponibilidad, Favoritos, Login, etc.).

Cómo ejecutar localmente

1) Instalar dependencias

```powershell
pnpm install
```

2) Modo desarrollo

```powershell
pnpm dev
```

3) Build de producción

```powershell
pnpm build
```

> Nota: este proyecto es frontend y funciona 100% en el navegador; no requiere backend para probarlo.

## Bases de datos y persistencia de datos

Actualmente no hay una base de datos externa. La persistencia se realiza en `localStorage` del navegador mediante distintas claves. Esto facilita la demo sin servidor y permite que los datos persistan entre recargas en el mismo navegador.

Claves utilizadas y dónde se usan:
- `user`
	- Qué guarda: sesión del usuario de demo (id, name, email, role).
	- Contexto: `src/contexts/AuthContext.tsx`.
	- Vistas relacionadas: Login de cliente/proveedor (`pages/LoginCliente.tsx`, `pages/LoginProveedor.tsx`), dashboards y navegación.

- `event-favorites`
	- Qué guarda: lista de servicios marcados como favoritos.
	- Contexto: `src/contexts/FavoritesContext.tsx`.
	- Vistas relacionadas: `pages/Favoritos.tsx` (y acciones desde cards de servicios).

- `app-events-v1`
	- Qué guarda: catálogo de eventos/servicios (semilla + elementos añadidos por el usuario).
	- Contexto: `src/contexts/EventsContext.tsx`.
	- Vistas relacionadas: catálogo por tipo y secciones que muestran servicios.

- `app-pricing-v1`
	- Qué guarda: precios base por servicio y promociones activas con rango de fechas.
	- Contexto: `src/contexts/PricingContext.tsx`.
	- Vistas relacionadas: `pages/GestionarPrecios.tsx` (establecer precios y promociones) y componentes que muestran precio efectivo.

- `app-availability-v1`
	- Qué guarda: disponibilidad por servicio y fecha (estado: available/blocked/booked, capacidad, usados).
	- Contexto: `src/contexts/AvailabilityContext.tsx`.
	- Vistas relacionadas: `pages/GestionarDisponibilidad.tsx`.

- `app-notifications-v1`
	- Qué guarda: lista de notificaciones locales (p. ej., cambios de precio o acciones relevantes).
	- Contexto: `src/contexts/NotificationsContext.tsx`.
	- Vistas relacionadas: se consumen desde otros contextos para informar al usuario.

- `app-cart-v1` y `app-cart-coupon-v1`
	- Qué guarda: contenido del carrito (items, cantidades) y cupón aplicado.
	- Contexto: `src/contexts/CartContext.tsx`.
	- Vistas relacionadas: `components/CartSidebar.tsx`, `pages/Favoritos.tsx` (añadir al carrito).

- `app_reviews_v1`
	- Qué guarda: reseñas de usuarios por servicio y su estado (pending/responded).
	- Contexto: `src/contexts/ReviewsContext.tsx`.
	- Vistas relacionadas: `pages/VerResenas.tsx`, `pages/DashboardCliente.tsx`.



### Migración a una base de datos real (opcional)


- users: id, name, email, role, password_hash
- services (events): id, title, category, description, location, duration, base_price, event_type, images, created_at
- pricing: id, service_id, base, promotions[] { id, label, percent, start, end, active }
- availability: id, service_id, date, status, capacity, used, notes
- favorites: id, user_id, service_id
- cart: id, user_id, items[] { service_id, quantity, price }, coupon
- reviews: id, service_id, user_id, rating, comment, created_at, response
- notifications (opcional): id, user_id, type, payload, read, created_at



