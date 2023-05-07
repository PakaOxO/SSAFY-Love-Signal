package kr.lovesignal.authservice.service;

import kr.lovesignal.authservice.entity.MemberEntity;
import kr.lovesignal.authservice.exception.CustomException;
import kr.lovesignal.authservice.exception.ErrorCode;
import kr.lovesignal.authservice.model.request.SignUpRequest;
import kr.lovesignal.authservice.model.response.KauthAccountResponse;
import kr.lovesignal.authservice.model.response.KauthTokenResponse;
import kr.lovesignal.authservice.model.response.SignInResponse;
import kr.lovesignal.authservice.model.response.SuccessResponse;
import kr.lovesignal.authservice.repository.MemberRepository;
import kr.lovesignal.authservice.util.CommonUtils;
import kr.lovesignal.authservice.util.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final MemberRepository memberRepository;
    private final ResponseUtils responseUtils;
    private final CommonUtils commonUtils;

    // 회원가입
    @Override
    @Transactional
    public String registerMember(SignUpRequest signUpRequest, KauthAccountResponse kauthAccountResponse) {

        MemberEntity saveMember = MemberEntity.builder()
                .email(kauthAccountResponse.getKakao_account().getEmail())
                .birth(signUpRequest.getBirth())
                .description(signUpRequest.getBirth())
                .nickname(signUpRequest.getNickname())
                .gender(signUpRequest.getGender())
                .build();

        memberRepository.save(saveMember);

        return saveMember.getUUID().toString();
    }

    @Override
    @Transactional(readOnly = true)
    public SuccessResponse<SignInResponse> signIn(KauthTokenResponse kauthTokenResponse, KauthAccountResponse kauthAccountResponse) {
        String email = kauthAccountResponse.getKakao_account().getEmail();

        MemberEntity findMember = memberRepository.findByEmailAndExpired(email, "F");
        String strMemberUUID = null;
        if(findMember != null){
            strMemberUUID = findMember.getUUID().toString();
        }
        SignInResponse signInResponse = SignInResponse.builder()
                .memberUUID(strMemberUUID)
                .accessToken(kauthTokenResponse.getAccess_token())
                .accessTokenExpireTime(kauthTokenResponse.getExpires_in().intValue())
                .refreshToken(kauthTokenResponse.getRefresh_token())
                .build();

        return responseUtils.buildSuccessResponse(signInResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public SuccessResponse<String> checkNicknameDuplicate(String nickname) {

        MemberEntity findMember = memberRepository.findByNicknameAndExpiredLike(nickname, "F");

        if(null != findMember){
            throw new CustomException(ErrorCode.DUPLICATE_NICKNAME);
        }
        return responseUtils.buildSuccessResponse("사용 가능한 닉네임입니다.");
    }

    @Override
    @Transactional(readOnly = true)
    public SuccessResponse<String> makeRefreshResponse(KauthTokenResponse kauthTokenResponse, KauthAccountResponse kauthAccountResponse, String StrMemberUUID) {
        String email = kauthAccountResponse.getKakao_account().getEmail();
        UUID memberUUID = commonUtils.getValidUUID(StrMemberUUID);

        MemberEntity emailMember = memberRepository.findByEmailAndExpired(email, "F");

        if(emailMember == null){
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        else if(!emailMember.getUUID().equals(memberUUID)){
            throw new CustomException(ErrorCode.INVALID_AUTH_USER);
        }

        SignInResponse refreshResponse = SignInResponse.builder()
                .accessToken(kauthTokenResponse.getAccess_token())
                .accessTokenExpireTime(kauthTokenResponse.getExpires_in().intValue())
                .refreshToken(kauthTokenResponse.getRefresh_token())
                .memberUUID(memberUUID.toString())
                .build();

        return responseUtils.buildSuccessResponse(refreshResponse);
    }


}
