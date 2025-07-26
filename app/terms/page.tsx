export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8">
          <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 text-lg mb-6">
              Welcome to Berkeley World. By using our service, you agree to these terms. 
              Please read them carefully.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Acceptance of Terms</h2>
            <p className="text-slate-300 mb-4">
              By accessing and using Berkeley World, you accept and agree to be bound by the 
              terms and provision of this agreement.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Use License</h2>
            <p className="text-slate-300 mb-4">
              Permission is granted to temporarily access Berkeley World for personal, 
              non-commercial transitory viewing only.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">User Conduct</h2>
            <p className="text-slate-300 mb-4">
              You agree to use Berkeley World in a manner consistent with all applicable laws 
              and regulations and in accordance with these Terms of Service.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Limitation of Liability</h2>
            <p className="text-slate-300 mb-4">
              In no event shall Berkeley World or its suppliers be liable for any damages 
              arising out of the use or inability to use the service.
            </p>
            
            <p className="text-slate-400 text-sm mt-8">
              These are placeholder terms of service. Please consult with legal counsel to create 
              comprehensive terms of service for your actual service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}