export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 text-lg mb-6">
              At Berkeley World, we take your privacy seriously. This policy outlines how we collect, use, 
              and protect your information.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Information We Collect</h2>
            <p className="text-slate-300 mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              participate in gameplay, or contact us for support.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-slate-300 mb-4">
              We use the information we collect to provide, maintain, and improve our services, 
              communicate with you, and ensure the security of our platform.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Data Security</h2>
            <p className="text-slate-300 mb-4">
              We implement appropriate technical and organizational measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <p className="text-slate-400 text-sm mt-8">
              This is a placeholder privacy policy. Please consult with legal counsel to create 
              a comprehensive privacy policy for your actual service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}