import create from 'zustand';

// Defina o tipo para o estado do usuário
type UserState = {
  usuario: string;
  email: string;
  senha: string;
  confirmacaoSenha: string;
  salvarUsuario: (user: UserState) => void;
};

// Crie o store do usuário
export const useUserStore = create<UserState>((set) => ({
  usuario: '',
  email: '',
  senha: '',
  confirmacaoSenha: '',
  salvarUsuario: (user) => set(user),
}));
