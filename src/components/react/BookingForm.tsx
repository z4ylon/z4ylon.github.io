import { useEffect, useId, useRef, useState, type SubmitEvent } from 'react';
import Icon from './Icon';
import s from './BookingForm.module.css';
import { u } from '@/lib/url';

type Props = { email: string; roles: string[]; endpoint?: string };

type Fields = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  rol: string;
  fecha: string;
  ubicacion: string;
  mensaje: string;
  enlaces: string;
  acepto: boolean;
};

const empty: Fields = { nombre: '', apellido: '', email: '', telefono: '', rol: '', fecha: '', ubicacion: '', mensaje: '', enlaces: '', acepto: false };

// Preselecciones que llegan desde los botones "Solicitar…" de la web (?servicio=…)
const presets: Record<string, { rol: string; mensaje: string }> = {
  show: { rol: 'Promotor', mensaje: 'Hola Z4YLON, me gustaría contratar un show para mi evento.\n\nTipo de evento:\nAforo aproximado:\nHorario:\n' },
  boda: { rol: 'Particular (boda, cumpleaños, evento privado)', mensaje: 'Hola Z4YLON, me gustaría contar contigo para mi celebración.\n\nTipo de evento:\nNúmero de invitados:\nHorario:\n' },
  logo: { rol: 'Cliente para diseño gráfico', mensaje: 'Hola, me interesa el diseño de un logo.\n\nNombre de la marca:\nUsos previstos:\nPlazo deseado:\n' },
  visuales: { rol: 'Cliente para diseño gráfico', mensaje: 'Hola, me interesan unos visuales para mis shows.\n\nDuración aproximada:\n¿Logo vectorizado disponible?:\nPlazo deseado:\n' },
  flyers: { rol: 'Cliente para diseño gráfico', mensaje: 'Hola, necesito un flyer / portada para un evento.\n\nEvento y fecha:\nFormato (redes / impresión):\n' },
  pegatinas: { rol: 'Cliente para diseño gráfico', mensaje: 'Hola, me interesan pegatinas personalizadas con mi logo y redes.\n\nCantidad aproximada:\n' },
  tarjetas: { rol: 'Cliente para diseño gráfico', mensaje: 'Hola, me interesan tarjetas de presentación personalizadas (efecto metalizado).\n\nCantidad aproximada:\n' },
  destacados: { rol: 'Cliente para diseño gráfico', mensaje: 'Hola, me interesan portadas de destacados personalizadas para Instagram.\n\nNúmero de destacados y temas:\n' },
  marca: { rol: 'Cliente para diseño gráfico', mensaje: 'Hola, quiero impulsar mi marca con otra solución gráfica.\n\nLo que necesito:\n' },
  prensa: { rol: 'Agente de prensa', mensaje: 'Hola, escribo desde el medio:\n\n' },
};

export default function BookingForm({ email, roles, endpoint }: Props) {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'mailto' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get('servicio');
    const p = key ? presets[key] : undefined;
    if (p) setF((x) => ({ ...x, rol: roles.includes(p.rol) ? p.rol : x.rol, mensaje: p.mensaje }));
  }, [roles]);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setF((x) => ({ ...x, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!f.nombre.trim()) e.nombre = 'Escribe tu nombre.';
    if (!f.email.trim()) e.email = 'Escribe tu email para poder responderte.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) e.email = 'El email no parece válido (ejemplo: nombre@dominio.com).';
    if (f.telefono && !/^[+\d][\d\s().-]{6,}$/.test(f.telefono)) e.telefono = 'Revisa el teléfono (solo números, espacios y +).';
    if (!f.rol) e.rol = 'Elige la opción que mejor te describe.';
    if (f.mensaje.trim().length < 10) e.mensaje = 'Cuéntanos un poco más (mínimo 10 caracteres).';
    if (f.enlaces && !/^https?:\/\/\S+$/.test(f.enlaces.trim())) e.enlaces = 'El enlace debe empezar por https://';
    if (!f.acepto) e.acepto = 'Debes aceptar la política de privacidad para enviar el formulario.';
    return e;
  };

  const onSubmit = async (ev: SubmitEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const hp = (ev.currentTarget.elements.namedItem('web_empresa') as HTMLInputElement | null)?.value;
    if (hp) return; // bot
    const e = validate();
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const subject = `[Web] ${f.rol} · ${f.nombre} ${f.apellido}`.trim();
    const details = [
      `Nombre: ${f.nombre} ${f.apellido}`.trim(),
      `Email: ${f.email}`,
      f.telefono && `Teléfono: ${f.telefono}`,
      `Soy: ${f.rol}`,
      f.fecha && `Fecha del evento: ${f.fecha}`,
      f.ubicacion && `Ubicación: ${f.ubicacion}`,
      f.enlaces && `Documentos / enlaces: ${f.enlaces}`,
    ].filter(Boolean);
    const body = `${details.join('\n')}\n\n${f.mensaje}`;

    if (!endpoint) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...f, _subject: subject }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      setF(empty);
    } catch {
      setStatus('error');
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p className={s.error} id={id(`${k}-err`)}>
        <Icon name="close" size={14} /> {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof Fields, hint?: boolean) => ({
    id: id(k),
    name: k,
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': [errors[k] && id(`${k}-err`), hint && id(`${k}-hint`)].filter(Boolean).join(' ') || undefined,
  });

  if (status === 'sent') {
    return (
      <div className={s.done} ref={statusRef} tabIndex={-1} role="status">
        <span className={s.doneIcon}>
          <Icon name="check" size={28} />
        </span>
        <h3 className="h3">¡Solicitud enviada!</h3>
        <p>Gracias por escribir. Z4YLON te responderá lo antes posible, normalmente en 24–48 h.</p>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus('idle')}>
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className={s.form} onSubmit={onSubmit} noValidate aria-describedby={id('intro')}>
      <p id={id('intro')} className={s.intro}>
        Los campos marcados con <span aria-hidden="true">*</span>
        <span className="sr-only">asterisco</span> son obligatorios. Si necesitas enviar documentos pesados, añade un enlace de WeTransfer o Google Drive.
      </p>

      <div className={s.grid}>
        <div className={s.field}>
          <label htmlFor={id('nombre')}>
            Nombre <span aria-hidden="true">*</span>
          </label>
          <input {...a11y('nombre')} autoComplete="given-name" required value={f.nombre} onChange={(e) => set('nombre', e.target.value)} />
          {err('nombre')}
        </div>
        <div className={s.field}>
          <label htmlFor={id('apellido')}>Apellidos</label>
          <input {...a11y('apellido')} autoComplete="family-name" value={f.apellido} onChange={(e) => set('apellido', e.target.value)} />
        </div>
        <div className={s.field}>
          <label htmlFor={id('email')}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input {...a11y('email')} type="email" autoComplete="email" inputMode="email" required value={f.email} onChange={(e) => set('email', e.target.value)} />
          {err('email')}
        </div>
        <div className={s.field}>
          <label htmlFor={id('telefono')}>Teléfono</label>
          <input {...a11y('telefono')} type="tel" autoComplete="tel" inputMode="tel" value={f.telefono} onChange={(e) => set('telefono', e.target.value)} />
          {err('telefono')}
        </div>
        <div className={s.field}>
          <label htmlFor={id('rol')}>
            Soy <span aria-hidden="true">*</span>
          </label>
          <div className={s.selectWrap}>
            <select {...a11y('rol')} required value={f.rol} onChange={(e) => set('rol', e.target.value)}>
              <option value="" disabled>
                Elige una opción
              </option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <Icon name="chevronDown" size={18} />
          </div>
          {err('rol')}
        </div>
        <div className={s.field}>
          <label htmlFor={id('fecha')}>Fecha del evento</label>
          <input {...a11y('fecha')} type="date" value={f.fecha} onChange={(e) => set('fecha', e.target.value)} />
        </div>
        <div className={`${s.field} ${s.full}`}>
          <label htmlFor={id('ubicacion')}>Ubicación del evento o desde dónde escribes</label>
          <input {...a11y('ubicacion')} autoComplete="address-level2" placeholder="Ciudad, sala o recinto" value={f.ubicacion} onChange={(e) => set('ubicacion', e.target.value)} />
        </div>
        <div className={`${s.field} ${s.full}`}>
          <label htmlFor={id('mensaje')}>
            Cuéntanos qué necesitas <span aria-hidden="true">*</span>
          </label>
          <textarea {...a11y('mensaje')} rows={6} required value={f.mensaje} onChange={(e) => set('mensaje', e.target.value)} />
          {err('mensaje')}
        </div>
        <div className={`${s.field} ${s.full}`}>
          <label htmlFor={id('enlaces')}>Documentos y enlaces</label>
          <input {...a11y('enlaces', true)} type="url" inputMode="url" placeholder="https://" value={f.enlaces} onChange={(e) => set('enlaces', e.target.value)} />
          <p className={s.hint} id={id('enlaces-hint')}>
            Rider del local, cartel, referencias… Recomendado: WeTransfer o Google Drive.
          </p>
          {err('enlaces')}
        </div>

        <div className={s.hp} aria-hidden="true">
          <label htmlFor={id('hp')}>No rellenar</label>
          <input id={id('hp')} name="web_empresa" tabIndex={-1} autoComplete="off" />
        </div>

        <div className={`${s.full} ${s.check}`}>
          <input {...a11y('acepto')} type="checkbox" checked={f.acepto} onChange={(e) => set('acepto', e.target.checked)} />
          <label htmlFor={id('acepto')}>
            He leído y acepto la <a href={u('/legal#privacidad')}>política de privacidad</a> y las <a href={u('/legal#condiciones')}>condiciones de uso</a>. <span aria-hidden="true">*</span>
          </label>
          {err('acepto')}
        </div>
      </div>

      <div className={s.footer}>
        <button className="btn" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando…' : 'Solicitar contacto'}
          <Icon name="arrowRight" />
        </button>
        <p className={s.alt}>
          ¿Prefieres correo? <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>

      <div ref={statusRef} tabIndex={-1} className={s.status} role="status" aria-live="polite">
        {status === 'mailto' && (
          <p>
            <Icon name="mail" size={16} /> Hemos abierto tu aplicación de correo con el mensaje preparado. Si no se ha abierto, escribe directamente a <a href={`mailto:${email}`}>{email}</a>.
          </p>
        )}
        {status === 'error' && (
          <p className={s.statusError}>
            No se ha podido enviar el formulario. Inténtalo de nuevo o escribe a <a href={`mailto:${email}`}>{email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
