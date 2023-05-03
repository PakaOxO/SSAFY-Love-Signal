package kr.lovesignal.teamservice.model.response;

import kr.lovesignal.teamservice.entity.MemberEntity;
import kr.lovesignal.teamservice.entity.TeamEntity;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class Team {

    private String teamUUID;
    private List<Member> members;

    public static Team buildTeamResponse(TeamEntity teamEntity, List<MemberEntity> memberEntities){
        return Team.builder()
                .teamUUID(teamEntity.getUUID().toString())
                .members(Member.buildMembers(memberEntities))
                .build();
    }
}
