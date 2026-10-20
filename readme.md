# �� Portafolio de Proyecto Web: NOVAK
**Estudiante:** Edgardo Josue Garcia Mendez
**Fecha:** [Fecha de Entrega]
**Enlace al Sitio Web (Vercel):** https://productoproyecto-novak.vercel.app/
**Repositorio GitHub:** https://github.com/edgardojosuegarciamendez04-afk/producto_proyecto-Novak/new/master?filename=README.md
---
## 1. Identidad de Marca y Producto
### �� Ficha del Producto
* **Nombre Comercial:** NOVAK
* **Descripción:** Plataforma de venta de ropa urbana. Ofrece un catálogo interactivo de prendas de corte oversized, pantalones baggy y calzado de la mejor calidad, incorporando cambio de tema e idioma.
* **Público Objetivo:** A cualquier que quiera andar con un buen estilo.
### ��️ Diseño Visual
* **Logotipo:**
![Logotipo de la Marca](assets/logo.png)
* **Paleta de Colores:**
| Color | Código HEX | Uso en el Sitio |
| :--- | :--- | :--- |
| Dominante | `#1F4E79` | Header y Navegación |
| Secundario | `#2F5597` | Tarjetas y Botones |
| Acento | `#2B579A` | Highlights y Hovers |
* **Demostración del Carousel (Bootstrap):**
![Carousel de Productos](assets/carousel-demo.png)
---
## 2. Investigación Técnica
Resumen informativo de las subpáginas creadas:
1. **JavaScript (Vanilla):** Aprendizaje de manipulación del DOM, manejo de eventos, almacenamiento de preferencias en localStorage para persistencia de tema e idioma, e inyección dinámica de alertas.
2. **jQuery:** Comprensión de la sintaxis resumida, selección simplificada de elementos, animaciones integradas y comparación directa respecto a JavaScript Vanilla.
3. **JSON:** Estructuración de datos en formato clave-valor para la gestión de inventarios, catalogación de prendas y transferencia ligera de datos entre cliente y servidor.
4. **Web Hosting y Dominios:** Conceptos de despliegue continuo en Vercel conectado a GitHub, propagación de servidores DNS y traducción de nombres de dominio a direcciones IP.
---
## 3. Integraciones Especiales
### �� Formulario de Contacto + Webhook de Discord
Explicación técnica del funcionamiento:
1. El usuario completa el formulario en la web.
2. Se ejecuta una petición asíncrona hacia la URL del Webhook de Discord.
3. La notificación se despliega inmediatamente en el canal de Discord.
---
## 4. Anexos y Evidencias Gráficas
*(Consultar la Sección 5 de la guía para el detalle de las 5 capturas obligatorias)*
---
## 5. Conclusiones y Autoevaluación
* **Desafíos enfrentados:** Evitar el parpadeo de pantalla al cambiar entre modo oscuro/claro y la sincronización del cambio de idioma en las 8 subpáginas del sitio. Se resolvió implementando un script de precarga inmediata en el <head> y leyendo el estado guardado en localStorage
* **Aprendizajes clave:** Dominio en la maquetación responsiva con Bootstrap 5, gestión de estado en el navegador del usuario con JavaScript Vanilla, creación de un catálogo estilizado y despliegue exitoso de aplicaciones web en Vercel.