# The One Guadalupe Inn — Landing de venta

Rediseño premium del sitio de venta de departamentos **The One Guadalupe Inn** (Av. Revolución 1378, CDMX).

## Estructura

```
index.html        # Página completa (una sola página con anclas)
css/styles.css    # Estilos (paleta navy + dorado, tipografía serif/sans)
js/main.js        # Interacciones: menú móvil, filtro de galería, animaciones, formulario
```

## Secciones

1. **Hero** — reproducido según el diseño aprobado (fondo oscuro, acentos dorados, stats: 15 niveles / 69 departamentos / Av. Revolución 1378).
2. **Amenidades** — estilo bento (Roof Garden, Co-working, Seguridad 24/7, Pet Zone).
3. **Tipologías** — **rejilla a 2 columnas** con precio, m², recámaras, baños y características.
4. **Ventajas** — por qué invertir en Guadalupe Inn.
5. **Galería** — con filtros (Fachada / Interiores / Amenidades).
6. **Puntos de interés** — comercios, recreación, super, restaurantes.
7. **Ubicación** — mapa embebido de Av. Revolución 1378.
8. **Contacto** — formulario de registro.
9. **Otros desarrollos** de The One Inmobiliaria.
10. **Footer** + WhatsApp flotante.

## ⚠️ Imágenes

Todas las imágenes son **placeholders gratuitos de Unsplash** (renders y fotos de stock).
**Reemplázalas** por los renders/fotos reales del desarrollo:

- Fondo del hero → `.hero-bg` en `css/styles.css` y la imagen de fondo.
- Amenidades → atributo `style="--img:url(...)"` en cada `.amenity` de `index.html`.
- Tipologías → `--img` en cada `.typology-media`.
- Galería → `src` de cada `<img>` en `#galleryGrid`.
- Otros desarrollos → `--img` en cada `.development`.

## Datos por confirmar

Los **precios, metrajes y características** de las tipologías (01, 03, 05, 06, 10) se
cargaron con valores de referencia legibles del sitio original; verifica y ajusta las
cifras finales. Teléfono, correo y número de WhatsApp (`525500000000`) también son
placeholders a reemplazar.

## Uso local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8000
# visita http://localhost:8000
```
