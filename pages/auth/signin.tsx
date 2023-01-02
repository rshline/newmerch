import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from "next-auth/react"
import { useRouter } from "next/router";

interface IState {
    // providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
    providers: any[]
}

export default function SignIn({ providers }: IState) {

    const router = useRouter()

    const handleSignIn = (provider: any) => {
        signIn(provider.id)
        router.push('/')
    }

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-gradient-to-bl from-primary-violet to-primary-blue">
        <div className="flex font-abeezee drop-shadow-lg">
            <div className="h-full hidden md:block">
                <img src="https://kpopping.com/documents/b4/4/800/NewJeans-2023-SEASON-S-GREETINGS-Concept-Photo-documents-3(1).jpeg?v=8399d" className="object-cover w-52" />
            </div>
            <div className="flex flex-col md:w-64 lg:w-96 px-6 pb-4 justify-center items-center space-y-2 bg-white">
                <img src='/newmerch-logo.png' className="h-16" />
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)} className='px-4 py-2 cursor-pointer rounded-full bg-primary-blue text-white hover:bg-primary-blue/80'>
                        Sign in with {provider.name}
                    </button>
                    </div>
                ))}                                
            </div>
        </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}