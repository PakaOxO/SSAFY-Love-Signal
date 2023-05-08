package kr.lovesignal.chattingservice.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "member")
@Getter
@Setter
@DynamicInsert
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", columnDefinition = "INT UNSIGNED")
    private Long memberId;

    @Column(name = "login_id", nullable = false, unique = true)
    private String loginId;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "nickname", nullable = false, length = 20)
    private String nickname;

    @Column(name = "gender", nullable = false, length = 1)
    private String gender;

    @Column(name = "birth", nullable = false, length = 8)
    private String birth;

    @Column(name = "description", nullable = true, length = 120)
    private String description;

    @Column(name = "team_leader", nullable = false, length = 1)
    @ColumnDefault("'F'")
    private String teamLeader;

//    @OneToOne
//    @JoinColumn(name = "profile_image_id", nullable = false)
//    private ProfileImage profileImage;


    @ManyToOne
    @JoinColumn(name = "team_id", nullable = true)
    private Team team;

    @Builder.Default
    @OneToMany(mappedBy = "member")
    private List<Participant> participants = new ArrayList<>();



}
