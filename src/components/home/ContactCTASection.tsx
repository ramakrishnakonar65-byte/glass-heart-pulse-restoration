import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ContactCTASection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    message: "",
  });

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`RCIIF Enquiry — ${form.name || "Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nOrganisation: ${form.org}\n\n${form.message}`
    );
    window.location.href = `mailto:hello@rciif.org?subject=${subject}&body=${body}`;
  };

  return (
    <section className="w-full py-20 md:py-28 px-4 bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left */}
          <div>
            <span data-reveal data-delay="0" className="text-green-400 font-[Instrument_Sans] text-sm tracking-widest uppercase block">
              Get In Touch
            </span>
            <h2 data-reveal data-delay="0" className="text-4xl md:text-5xl lg:text-6xl font-bold font-[Instrument_Serif] text-white mt-3 mb-6 leading-[1.05]">
              Start Your Journey
            </h2>
            <p data-reveal data-delay="150" className="text-white/60 font-[Instrument_Sans] text-base md:text-lg leading-relaxed mb-10 max-w-md">
              Whether you're building, backing or partnering — there's a door
              into RCIIF that fits.
            </p>

            <div className="space-y-3">
              {[
                { icon: <Mail className="w-5 h-5" />, label: "Email", value: "hello@rciif.org" },
                { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+91 22 0000 0000" },
                {
                  icon: <MapPin className="w-5 h-5" />,
                  label: "Visit",
                  value: "Kharghar, Navi Mumbai",
                },
              ].map((c) => (
                <motion.div
                  key={c.label}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-500/15 text-green-400 flex items-center justify-center flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-[Instrument_Sans] text-white/45 uppercase tracking-widest">
                      {c.label}
                    </div>
                    <div className="text-white font-[Instrument_Sans]">{c.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-10 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Name"
                value={form.name}
                onChange={onChange("name")}
                placeholder="Jane Founder"
                required
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={onChange("email")}
                placeholder="jane@startup.in"
                required
              />
            </div>
            <Field
              label="Organisation"
              value={form.org}
              onChange={onChange("org")}
              placeholder="Acme Labs"
            />
            <div>
              <label className="block text-[10px] font-[Instrument_Sans] text-white/55 uppercase tracking-widest mb-2">
                Message
              </label>
              <textarea
                value={form.message}
                onChange={onChange("message")}
                rows={4}
                required
                placeholder="Tell us what you're building or what you're looking for…"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white font-[Instrument_Sans] placeholder:text-white/30 focus:outline-none focus:border-green-400/60 transition-colors resize-none"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold font-[Instrument_Sans] px-7 py-4 rounded-xl text-base transition-colors"
            >
              Send Message
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-[10px] font-[Instrument_Sans] text-white/55 uppercase tracking-widest mb-2">
        {label}
      </label>
      <input
        {...rest}
        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white font-[Instrument_Sans] placeholder:text-white/30 focus:outline-none focus:border-green-400/60 transition-colors"
      />
    </div>
  );
}
