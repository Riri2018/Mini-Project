const SectionHeader = ({ title, subtitle, action }) => (
  <div className="flex items-start justify-between mb-5">
    <div>
      <h2 className="text-[17px] font-semibold text-white/90" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h2>
      {subtitle && <p className="text-[12px] text-white/45 mt-0.5">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

export default SectionHeader;
