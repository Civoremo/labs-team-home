//
//  DocumentsViewController.swift
//  TeamHome
//
//  Created by Andrew Dhan on 2/20/19.
//  Copyright © 2019 Lambda School under the MIT license. All rights reserved.
//

import UIKit
import Apollo

class DocumentsViewController: UIViewController, TabBarChildrenProtocol {

    

    override func viewDidLoad() {
        super.viewDidLoad()
        
        setUpViewAppearance()
        createGradientLayer()
        teamNameLabel.textColor = .white
        teamNameLabel.font = Appearance.setTitleFont(with: .title2, pointSize: 20)
        
        // Show team name on label
        displayTeamInfo()
        
        // Set this view controller as delegate for all cells.
        
    }
    
    // MARK: - Private Functions
    // Create gradient layer for view background.
    private func createGradientLayer() {
        gradientLayer = CAGradientLayer()
        
        gradientLayer.frame = self.view.bounds
        
        gradientLayer.colors = [Appearance.grayColor.cgColor, Appearance.likeGrayColor.cgColor, Appearance.grayColor.cgColor]
        
        
        gradientLayer.locations = [0.0, 0.5]
        gradientLayer.startPoint = CGPoint(x: 0.0, y: 0.0)
        gradientLayer.endPoint = CGPoint(x: 1.0, y: 1.0)
        
        self.view.layer.insertSublayer(gradientLayer, at: 0)
    }
    private func displayTeamInfo() {
        guard let team = team else { return }
        
        teamNameLabel.text = team.name
    }
    
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    
    private var gradientLayer: CAGradientLayer!
    
    var apollo: ApolloClient?
    var team: FindTeamsByUserQuery.Data.FindTeamsByUser?
    var currentUser: CurrentUserQuery.Data.CurrentUser?
    
    @IBOutlet weak var teamNameLabel: UILabel!
    @IBOutlet weak var filterButton: UIButton!
    @IBOutlet weak var containerView: UIView!
}
