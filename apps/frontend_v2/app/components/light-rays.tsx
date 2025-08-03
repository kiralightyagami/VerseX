export function LightRays() {
  return (
    <div className="fixed inset-0 pointer-events-none select-none transition-opacity duration-[250ms] ease-linear opacity-85">
      {/* Ray One */}
      <div 
        className="absolute w-[480px] h-[680px] rotate-[80deg] -top-[540px] left-[250px] blur-[110px]"
        style={{
          background: 'radial-gradient(rgba(83, 196, 255, 0.85) 0%, rgba(43, 166, 255, 0) 100%)'
        }}
      />
      
      {/* Ray Two */}
      <div 
        className="absolute w-[110px] h-[400px] -rotate-[20deg] -top-[280px] left-[350px] mix-blend-overlay opacity-60 blur-[60px]"
        style={{
          background: 'radial-gradient(rgba(83, 196, 255, 0.85) 0%, rgba(43, 166, 255, 0) 100%)'
        }}
      />
      
      {/* Ray Three */}
      <div 
        className="absolute w-[400px] h-[370px] -top-[350px] left-[200px] mix-blend-overlay opacity-60 blur-[21px]"
        style={{
          background: 'radial-gradient(rgba(83, 196, 255, 0.85) 0%, rgba(43, 166, 255, 0) 100%)'
        }}
      />
      
      {/* Ray Four */}
      <div 
        className="absolute w-[330px] h-[370px] -top-[330px] left-[50px] mix-blend-overlay opacity-50 blur-[21px]"
        style={{
          background: 'radial-gradient(rgba(83, 196, 255, 0.85) 0%, rgba(43, 166, 255, 0) 100%)'
        }}
      />
      
      {/* Ray Five */}
      <div 
        className="absolute w-[110px] h-[400px] -rotate-[40deg] -top-[280px] -left-[10px] mix-blend-overlay opacity-80 blur-[60px]"
        style={{
          background: 'radial-gradient(rgba(83, 196, 255, 0.85) 0%, rgba(43, 166, 255, 0) 100%)'
        }}
      />
    </div>
  );
}